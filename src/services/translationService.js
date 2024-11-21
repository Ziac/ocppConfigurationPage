angular.module('ocppConfigApp')
.factory('TranslationService', function($window) {
  const translations = {
    en: {
      title: 'OCPP Configuration Manager',
      search: 'Search configurations...',
      allCategories: 'All Categories',
      value: 'Value',
      readonly: 'Read-only',
      edit: 'Edit Configuration',
      save: 'Save Changes',
      cancel: 'Cancel',
      currentValue: 'Current value',
      type: 'Type',
      success: {
        configLoaded: 'Configuration loaded successfully',
        configUpdated: 'Configuration updated successfully'
      },
      error: {
        configLoad: 'Error loading configuration',
        configUpdate: 'Error updating configuration'
      }
    },
    tr: {
      title: 'OCPP Yapılandırma Yöneticisi',
      search: 'Yapılandırmaları ara...',
      allCategories: 'Tüm Kategoriler',
      value: 'Değer',
      readonly: 'Salt okunur',
      edit: 'Yapılandırmayı Düzenle',
      save: 'Değişiklikleri Kaydet',
      cancel: 'İptal',
      currentValue: 'Mevcut değer',
      type: 'Tip',
      success: {
        configLoaded: 'Yapılandırma başarıyla yüklendi',
        configUpdated: 'Yapılandırma başarıyla güncellendi'
      },
      error: {
        configLoad: 'Yapılandırma yüklenirken hata oluştu',
        configUpdate: 'Yapılandırma güncellenirken hata oluştu'
      }
    }
  };

  const currentLang = $window.navigator.language?.startsWith('tr') ? 'tr' : 'en';

  return {
    getTranslations: function() {
      return translations[currentLang];
    },
    getCurrentLanguage: function() {
      return currentLang;
    },
    translate: function(key, section = null) {
      if (section) {
        return translations[currentLang][section]?.[key] || key;
      }
      return translations[currentLang][key] || key;
    }
  };
});