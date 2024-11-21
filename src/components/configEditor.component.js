angular.module('ocppConfigApp')
  .component('configEditor', {
    bindings: {
      config: '<',
      onSave: '&',
      onCancel: '&'
    },
    template: `
      <div class="editor-overlay" ng-click="$ctrl.cancel()">
        <md-card class="editor-card" ng-click="$event.stopPropagation()">
          <md-toolbar class="editor-header">
            <div class="md-toolbar-tools">
              <i class="fas" ng-class="$ctrl.config.icon"></i>
              <h2>{{$ctrl.config.key}}</h2>
              <span flex></span>
              <md-button class="md-icon-button" ng-click="$ctrl.cancel()" aria-label="Close">
                <i class="fas fa-times"></i>
              </md-button>
            </div>
          </md-toolbar>

          <md-card-content>
            <div class="editor-content">
              <div class="config-info">
                <p class="config-description">{{$ctrl.config.description}}</p>
                <div class="config-meta">
                  <span class="meta-item">
                    <i class="fas fa-tag"></i>
                    {{$ctrl.config.category}}
                  </span>
                  <span class="meta-item">
                    <i class="fas fa-code"></i>
                    {{$ctrl.config.valueType}}
                  </span>
                </div>
              </div>

              <form name="configForm" ng-submit="$ctrl.save()" class="edit-form">
                <div class="value-editor" ng-switch="$ctrl.config.valueType">
                  <!-- Boolean Editor -->
                  <div ng-switch-when="boolean" class="boolean-editor">
                    <md-switch ng-model="$ctrl.boolValue" class="md-primary" aria-label="Boolean Value">
                      <span class="switch-label">{{$ctrl.boolValue ? 'Enabled' : 'Disabled'}}</span>
                    </md-switch>
                    <div class="input-hint">Current value: {{$ctrl.config.value === 'true' ? 'Enabled' : 'Disabled'}}</div>
                  </div>

                  <!-- Integer Editor -->
                  <md-input-container class="md-block" ng-switch-when="integer">
                    <label>New Value</label>
                    <input type="number"
                           ng-model="$ctrl.newValue"
                           min="0"
                           required
                           aria-label="Integer Value">
                    <div class="input-hint">
                      <span>Current value: {{$ctrl.config.value}}</span>
                      <span ng-if="$ctrl.config.unit">({{$ctrl.config.unit}})</span>
                    </div>
                    <div ng-messages="configForm.$error">
                      <div ng-message="number">Please enter a valid number</div>
                      <div ng-message="min">Value must be positive</div>
                    </div>
                  </md-input-container>

                  <!-- String Editor -->
                  <md-input-container class="md-block" ng-switch-default>
                    <label>New Value</label>
                    <input type="text"
                           ng-model="$ctrl.newValue"
                           required
                           aria-label="String Value">
                    <div class="input-hint">Current value: {{$ctrl.config.value}}</div>
                  </md-input-container>
                </div>

                <div class="validation-message" ng-if="$ctrl.validationError">
                  <i class="fas fa-exclamation-circle"></i>
                  {{$ctrl.validationError}}
                </div>

                <div class="form-actions">
                  <md-button class="md-raised" ng-click="$ctrl.cancel()">
                    Cancel
                  </md-button>
                  <md-button type="submit" 
                            class="md-raised md-primary"
                            ng-disabled="configForm.$invalid || $ctrl.validationError">
                    Save Changes
                  </md-button>
                </div>
              </form>
            </div>
          </md-card-content>
        </md-card>
      </div>
    `,
    controller: function() {
      this.$onInit = function() {
        this.initializeValue();
        this.validationError = null;
      };

      this.initializeValue = function() {
        if (this.config.valueType === 'boolean') {
          this.boolValue = this.config.value.toLowerCase() === 'true';
        } else {
          this.newValue = this.config.value;
        }
      };

      this.validateValue = function() {
        this.validationError = null;

        if (this.config.valueType === 'integer') {
          const numValue = parseInt(this.newValue, 10);
          if (isNaN(numValue)) {
            this.validationError = 'Please enter a valid number';
            return false;
          }
          if (numValue < 0) {
            this.validationError = 'Value must be positive';
            return false;
          }
        }

        return true;
      };

      this.save = function() {
        if (!this.validateValue()) {
          return;
        }

        const finalValue = this.config.valueType === 'boolean'
          ? this.boolValue.toString()
          : this.newValue.toString();

        this.onSave({ key: this.config.key, value: finalValue });
      };

      this.cancel = function() {
        this.onCancel();
      };
    }
  });