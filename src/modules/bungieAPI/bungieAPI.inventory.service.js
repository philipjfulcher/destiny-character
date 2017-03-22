(function() {
'use strict';

    angular
        .module('app.bungieAPI')
        .service('inventoryService', inventoryService);

    inventoryService.$inject = ['BungieAPI'];

    function inventoryService(BungieAPI) {
        
        this.getCharacterInventory = getCharacterInventory;

        function getCharacterInventory(platform, playerId, characterId) {
            var method;
            var endpoint;
            var useSecureUrl;
            var requestDefinitions;
            
            method = 'get';
            
            endpoint = platform+'/';
            endpoint += 'Account/';
            endpoint += playerId+'/';
            endpoint += 'Character/';
            endpoint += characterId+'/';
            endpoint += 'Inventory/Summary/';

            useSecureUrl = true;
            requestDefinitions = true;

            return BungieAPI.sendRequest(method, endpoint, useSecureUrl, requestDefinitions).then(function(response) {
                return transformInventory(response.data.items, response.definitions);
            });
        }

        // private functions

        function transformInventory(items, definitions) {
            var transformedInventory;
            
            transformedInventory = items.map(function (item) {
                var transformedItem = {};
                var itemDefinition;
                var statGroup;

                itemDefinition = definitions.items[item.itemHash];

                transformedItem.iconURL = BungieAPI.assetsUrl + itemDefinition.icon;
                
                if(item.damageTypeHash !== 0) {
                    transformedItem.damageTypeIconURL = BungieAPI.assetsUrl + definitions.damageTypes[item.damageTypeHash].iconPath;
                }

                transformedItem.name = itemDefinition.itemName;
                transformedItem.type = itemDefinition.itemTypeName;
                transformedItem.tier = {
                    name: itemDefinition.tierTypeName,
                    type: itemDefinition.tierType
                };
                
                if(itemDefinition.primaryBaseStatHash !== 0) {
                    transformedItem.primaryStat = {
                        value: itemDefinition.stats[itemDefinition.primaryBaseStatHash].value,
                        name: definitions.stats[itemDefinition.primaryBaseStatHash].statName
                    };
                }
                
                if(itemDefinition.statGroupHash !== 0) {
                    statGroup = definitions.statGroups[itemDefinition.statGroupHash].scaledStats;

                    transformedItem.stats = statGroup.map(function(stat) {
                        var transformedStat = {};

                        transformedStat.name = definitions.stats[stat.statHash].statName;
                        if(itemDefinition.stats[stat.statHash]) {
                            transformedStat.value = itemDefinition.stats[stat.statHash].value;
                        }

                        return transformedStat;
                    });
                }
                

                return transformedItem;

            });

            return transformedInventory;
        }
        
    }
})();