angular.module('ocppConfigApp')
.service('OCPPService', function($http) {
    const mockConfigurationData = {
        configurationKey: [
            {
                key: "HeartbeatInterval",
                value: "300",
                readonly: false
            },
            {
                key: "ConnectionTimeOut",
                value: "60",
                readonly: false
            },
            {
                key: "ResetRetries",
                value: "3",
                readonly: true
            },
            {
                key: "AuthorizationCacheEnabled",
                value: "true",
                readonly: false
            },
            {
                key: "AllowOfflineTxForUnknownId",
                value: "false",
                readonly: false
            },
            {
                key: "AuthorizeRemoteTxRequests",
                value: "true",
                readonly: false
            },
            {
                key: "BlinkRepeat",
                value: "3",
                readonly: false
            },
            {
                key: "LocalPreAuthorize",
                value: "true",
                readonly: false
            },
            {
                key: "MaxEnergyOnInvalidId",
                value: "0",
                readonly: false
            },
            {
                key: "MeterValuesSampledData",
                value: "Energy.Active.Import.Register,Current.Import,Voltage,Power.Active.Import",
                readonly: false
            },
            {
                key: "MeterValueSampleInterval",
                value: "60",
                readonly: false
            },
            {
                key: "StopTransactionOnInvalidId",
                value: "true",
                readonly: false
            },
            {
                key: "TransactionMessageRetryInterval",
                value: "30",
                readonly: false
            },
            {
                key: "UnlockConnectorOnEVSideDisconnect",
                value: "true",
                readonly: false
            },
            {
                key: "WebSocketPingInterval",
                value: "180",
                readonly: false
            },
            {
                key: "LocalAuthListEnabled",
                value: "true",
                readonly: false
            },
            {
                key: "LocalAuthListMaxLength",
                value: "100",
                readonly: false
            },
            {
                key: "ChargeProfileMaxStackLevel",
                value: "3",
                readonly: true
            },
            {
                key: "ChargingScheduleMaxPeriods",
                value: "5",
                readonly: true
            },
            {
                key: "ConnectorSwitch3to1PhaseSupported",
                value: "false",
                readonly: true
            },
            {
                key: "MaxChargingProfilesInstalled",
                value: "10",
                readonly: true
            },
            {
                key: "SupportedFileTransferProtocols",
                value: "FTP,FTPS,HTTP,HTTPS",
                readonly: true
            },
            {
                key: "ReserveConnectorZeroSupported",
                value: "true",
                readonly: true
            },
            {
                key: "RemoteTriggerSupported",
                value: "true",
                readonly: true
            }
        ]
    };

    this.getConfiguration = function() {
        // Simulated OCPP GetConfiguration request
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockConfigurationData);
            }, 500);
        });
    };

    this.changeConfiguration = function(key, value) {
        // Simulated OCPP ChangeConfiguration request
        return new Promise((resolve) => {
            setTimeout(() => {
                const configItem = mockConfigurationData.configurationKey.find(c => c.key === key);
                if (configItem && !configItem.readonly) {
                    configItem.value = value;
                    resolve({ status: "Accepted" });
                } else {
                    resolve({ status: "Rejected" });
                }
            }, 500);
        });
    };
});