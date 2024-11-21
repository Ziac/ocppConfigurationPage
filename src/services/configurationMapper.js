angular.module('ocppConfigApp')
.factory('ConfigurationMapper', function() {
  const configGroups = [
    { id: 'core', label: 'Core', icon: 'fa-microchip' },
    { id: 'authorization', label: 'Authorization', icon: 'fa-key' },
    { id: 'local', label: 'Local', icon: 'fa-database' },
    { id: 'smart', label: 'Smart Charging', icon: 'fa-bolt' },
    { id: 'firmware', label: 'Firmware', icon: 'fa-code' }
  ];

  const meterValueItems = {
    'Energy.Active.Import.Register': {
      description: 'Imported energy reading in Wh or kWh',
      unit: 'Wh'
    },
    'Current.Import': {
      description: 'Current being drawn from grid',
      unit: 'A'
    },
    'Voltage': {
      description: 'Voltage per phase',
      unit: 'V'
    },
    'Power.Active.Import': {
      description: 'Active power being drawn',
      unit: 'W'
    },
    'Temperature': {
      description: 'Temperature reading',
      unit: '°C'
    },
    'SoC': {
      description: 'State of Charge of the EV battery',
      unit: '%'
    }
  };

  const configMetadata = {
    "HeartbeatInterval": {
      icon: "fa-heartbeat",
      category: "Core",
      valueType: "integer",
      unit: "seconds",
      description: "Interval between heartbeat messages in seconds"
    },
    "ConnectionTimeOut": {
      icon: "fa-clock",
      category: "Core",
      valueType: "integer",
      unit: "seconds",
      description: "Connection timeout before automatic disconnect"
    },
    "ResetRetries": {
      icon: "fa-redo",
      category: "Core",
      valueType: "integer",
      description: "Number of reset attempts before giving up"
    },
    "AuthorizationCacheEnabled": {
      icon: "fa-database",
      category: "Authorization",
      valueType: "boolean",
      description: "Enable/disable local authorization cache"
    },
    "AllowOfflineTxForUnknownId": {
      icon: "fa-wifi",
      category: "Authorization",
      valueType: "boolean",
      description: "Allow charging with unknown identifiers when offline"
    },
    "AuthorizeRemoteTxRequests": {
      icon: "fa-shield-alt",
      category: "Authorization",
      valueType: "boolean",
      description: "Require authorization for remote start transactions"
    },
    "BlinkRepeat": {
      icon: "fa-lightbulb",
      category: "Core",
      valueType: "integer",
      description: "Number of times to blink charge point lights"
    },
    "LocalPreAuthorize": {
      icon: "fa-check-circle",
      category: "Authorization",
      valueType: "boolean",
      description: "Require local authorization before charging"
    },
    "MaxEnergyOnInvalidId": {
      icon: "fa-battery-full",
      category: "Authorization",
      valueType: "integer",
      unit: "Wh",
      description: "Maximum energy to deliver when authorization fails"
    },
    "MeterValuesSampledData": {
      icon: "fa-chart-bar",
      category: "Core",
      valueType: "string",
      description: "List of values to be included in meter values",
      items: meterValueItems
    },
    "MeterValueSampleInterval": {
      icon: "fa-stopwatch",
      category: "Core",
      valueType: "integer",
      unit: "seconds",
      description: "Interval between meter value samples"
    },
    "StopTransactionOnInvalidId": {
      icon: "fa-hand-paper",
      category: "Authorization",
      valueType: "boolean",
      description: "Stop charging when authorization becomes invalid"
    },
    "TransactionMessageRetryInterval": {
      icon: "fa-sync",
      category: "Core",
      valueType: "integer",
      unit: "seconds",
      description: "Interval for retry of transaction messages"
    },
    "UnlockConnectorOnEVSideDisconnect": {
      icon: "fa-plug",
      category: "Core",
      valueType: "boolean",
      description: "Unlock connector when EV side disconnects"
    },
    "WebSocketPingInterval": {
      icon: "fa-exchange-alt",
      category: "Core",
      valueType: "integer",
      unit: "seconds",
      description: "Interval for WebSocket ping messages"
    },
    "LocalAuthListEnabled": {
      icon: "fa-list",
      category: "Local",
      valueType: "boolean",
      description: "Enable/disable local authorization list"
    },
    "LocalAuthListMaxLength": {
      icon: "fa-list-ol",
      category: "Local",
      valueType: "integer",
      description: "Maximum size of local authorization list"
    },
    "ChargeProfileMaxStackLevel": {
      icon: "fa-layer-group",
      category: "Smart",
      valueType: "integer",
      description: "Maximum number of stackable charging profiles"
    },
    "ChargingScheduleMaxPeriods": {
      icon: "fa-calendar",
      category: "Smart",
      valueType: "integer",
      description: "Maximum number of periods in charging schedule"
    },
    "ConnectorSwitch3to1PhaseSupported": {
      icon: "fa-random",
      category: "Core",
      valueType: "boolean",
      description: "Support for switching between 3 and 1 phase charging"
    },
    "MaxChargingProfilesInstalled": {
      icon: "fa-tasks",
      category: "Smart",
      valueType: "integer",
      description: "Maximum number of charging profiles"
    },
    "SupportedFileTransferProtocols": {
      icon: "fa-file-upload",
      category: "Firmware",
      valueType: "string",
      description: "List of supported file transfer protocols"
    },
    "ReserveConnectorZeroSupported": {
      icon: "fa-parking",
      category: "Core",
      valueType: "boolean",
      description: "Support for reserving connector 0 (entire charge point)"
    },
    "RemoteTriggerSupported": {
      icon: "fa-satellite-dish",
      category: "Core",
      valueType: "boolean",
      description: "Support for remote trigger messages"
    }
  };

  function getConfigMetadata(key) {
    return configMetadata[key] || {
      icon: "fa-cog",
      category: "Other",
      valueType: "string",
      description: "Configuration parameter"
    };
  }

  function formatValue(value, metadata) {
    if (!value) return '';
    
    if (metadata.valueType === 'boolean') {
      return value.toLowerCase() === 'true' ? 'Enabled' : 'Disabled';
    }
    if (metadata.unit) {
      return `${value} ${metadata.unit}`;
    }
    return value;
  }

  return {
    mapConfiguration: function(rawConfig) {
      if (!rawConfig || !rawConfig.key) {
        console.error('Invalid configuration object:', rawConfig);
        return null;
      }

      const metadata = getConfigMetadata(rawConfig.key);
      return {
        ...rawConfig,
        ...metadata,
        displayValue: formatValue(rawConfig.value, metadata),
        displayGroup: metadata.category.toLowerCase()
      };
    },

    getGroups: function() {
      return configGroups;
    }
  };
});