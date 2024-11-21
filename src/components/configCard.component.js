angular.module('ocppConfigApp')
.component('configCard', {
    bindings: {
      config: '<',
      onEdit: '&'
    },
    template: `
      <md-card class="config-item animate-card" ng-class="{'readonly': $ctrl.config.readonly}">
        <div class="config-item-header" ng-class="{'readonly': $ctrl.config.readonly}">
          <div class="header-content">
            <i class="fas" ng-class="$ctrl.config.icon"></i>
            <h3>{{$ctrl.config.key}}</h3>
          </div>
          <div class="header-badge" ng-if="$ctrl.config.category">
            {{$ctrl.config.category}}
          </div>
        </div>
        <div class="config-item-content">
          <p class="description">{{$ctrl.config.description}}</p>
          
          <!-- Special handling for MeterValuesSampledData -->
          <div class="value-container" ng-if="$ctrl.config.key === 'MeterValuesSampledData'">
            <p class="value">
              <span>Selected Values:</span>
            </p>
            <div class="meter-values-list">
              <div class="meter-value-item" ng-repeat="item in $ctrl.meterValues">
                <strong>{{item.name}}</strong>
                <span class="meter-unit" ng-if="item.unit">({{item.unit}})</span>
                <p class="meter-description">{{item.description}}</p>
              </div>
            </div>
          </div>

          <!-- Default value display for other configs -->
          <div class="value-container" ng-if="$ctrl.config.key !== 'MeterValuesSampledData'">
            <p class="value">
              <span>Value:</span>
              <span class="config-value" ng-class="{'boolean': $ctrl.isBoolean($ctrl.config.value)}"
                    title="{{$ctrl.config.value}}">
                {{$ctrl.config.displayValue}}
              </span>
            </p>
          </div>

          <div class="value-meta">
            <span class="type-badge" title="Value Type">
              <i class="fas fa-code"></i>
              {{$ctrl.config.valueType}}
            </span>
            <span class="status-badge" ng-if="$ctrl.config.readonly" title="Read-only">
              <i class="fas fa-lock"></i> Read-only
            </span>
          </div>
          
          <div class="config-actions">
            <md-button class="md-fab md-mini" ng-if="!$ctrl.config.readonly" 
                      ng-click="$ctrl.onEdit({config: $ctrl.config})"
                      aria-label="Edit">
              <i class="fas fa-edit"></i>
            </md-button>
          </div>
        </div>
      </md-card>
    `,
    controller: function() {
      const ctrl = this;

      ctrl.$onInit = function() {
        if (ctrl.config.key === 'MeterValuesSampledData') {
          ctrl.processMeterValues();
        }
      };

      ctrl.$onChanges = function(changes) {
        if (changes.config && ctrl.config.key === 'MeterValuesSampledData') {
          ctrl.processMeterValues();
        }
      };

      ctrl.processMeterValues = function() {
        if (!ctrl.config.value) {
          ctrl.meterValues = [];
          return;
        }

        ctrl.meterValues = ctrl.config.value.split(',').map(value => {
          const trimmedValue = value.trim();
          const metadata = ctrl.config.items?.[trimmedValue] || {};
          
          return {
            name: trimmedValue,
            description: metadata.description || '',
            unit: metadata.unit || ''
          };
        });
      };

      ctrl.isBoolean = function(value) {
        return value?.toLowerCase() === 'true' || value?.toLowerCase() === 'false';
      };
    }
});