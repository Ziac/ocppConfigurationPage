angular.module('ocppConfigApp')
.controller('ConfigController', function(OCPPService, ConfigurationMapper, TranslationService, $mdToast, $scope) {
  const ctrl = this;
  
  // Initialize controller properties
  ctrl.configurations = [];
  ctrl.selectedConfig = null;
  ctrl.searchText = '';
  ctrl.loading = false;
  ctrl.selectedGroup = 'all';
  ctrl.translations = TranslationService.getTranslations();
  ctrl.groups = ConfigurationMapper.getGroups();
  ctrl.filteredConfigs = [];

  // Initialize the controller
  function init() {
    ctrl.getConfiguration();
  }

  ctrl.getConfiguration = async function() {
    if (ctrl.loading) return;
    
    ctrl.loading = true;
    try {
      const response = await OCPPService.getConfiguration();
      if (response?.configurationKey) {
        ctrl.configurations = response.configurationKey.map(config => 
          ConfigurationMapper.mapConfiguration(config)
        );
        ctrl.updateFilteredConfigs();
        showToast('success', ctrl.translations.success.configLoaded);
      }
    } catch (error) {
      console.error('Error loading configuration:', error);
      showToast('error', ctrl.translations.error.configLoad);
    } finally {
      ctrl.loading = false;
      safeApply();
    }
  };

  ctrl.updateFilteredConfigs = function() {
    ctrl.filteredConfigs = ctrl.configurations.filter(config => {
      if (!config) return false;

      const searchMatch = !ctrl.searchText || [
        config.key,
        config.description,
        config.value,
        config.category
      ].some(field => field?.toLowerCase().includes(ctrl.searchText.toLowerCase()));

      const groupMatch = ctrl.selectedGroup === 'all' || 
        config.displayGroup === ctrl.selectedGroup;

      return searchMatch && groupMatch;
    });
  };

  ctrl.getFilteredConfigs = function() {
    return ctrl.filteredConfigs;
  };

  ctrl.selectConfig = function(config) {
    if (!config) return;
    ctrl.selectedConfig = angular.copy(config);
  };

  ctrl.handleSave = async function(key, value) {
    if (!key || value === undefined) return;

    try {
      const response = await OCPPService.changeConfiguration(key, value);
      
      if (response?.status === 'Accepted') {
        const configIndex = ctrl.configurations.findIndex(c => c.key === key);
        if (configIndex !== -1) {
          ctrl.configurations[configIndex] = ConfigurationMapper.mapConfiguration({
            ...ctrl.configurations[configIndex],
            value
          });
          ctrl.updateFilteredConfigs();
        }
        showToast('success', ctrl.translations.success.configUpdated);
        ctrl.selectedConfig = null;
      } else {
        showToast('error', ctrl.translations.error.configUpdate);
      }
    } catch (error) {
      console.error('Error updating configuration:', error);
      showToast('error', ctrl.translations.error.configUpdate);
    } finally {
      safeApply();
    }
  };

  ctrl.handleCancel = function() {
    ctrl.selectedConfig = null;
  };

  function showToast(type, message) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .position('bottom right')
        .hideDelay(3000)
        .theme(type)
    );
  }

  function safeApply() {
    if (!$scope.$$phase && !$scope.$root.$$phase) {
      $scope.$apply();
    }
  }

  // Watch for filter changes
  $scope.$watchGroup(['ctrl.searchText', 'ctrl.selectedGroup'], function() {
    ctrl.updateFilteredConfigs();
  });

  // Initialize the controller
  init();
});