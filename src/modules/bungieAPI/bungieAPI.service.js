(function() {
'use strict';

    angular
        .module('app.bungieAPI')
        .service('BungieAPI', BungieAPI);

    BungieAPI.$inject = ['$http'];

    function BungieAPI($http) {
        this.baseUrl = 'www.bungie.net/platform/Destiny/';
        this.baseInsecureUrl = 'http://'+this.baseUrl;
        this.baseSecureUrl = 'https://'+this.baseUrl;

        this.dictionary = {
            inventorySlots: {
                subclass: '3284755031',
                primary: 1498876634,
                secondary: '2465295065',
                heavy: '953998645',
                head: '3448274439',
                chest: '14239492',
                arms: '3551918588',
                classItem: '1585787867',
                legs: '20886954',
                artifact: '434908299',
            }
        }
        


        this.getInventoryItem = getInventoryItem;
        this.getPlayerDetails = getPlayerDetails;
        this.getCharacters = getCharacters;
        this.getInventory = getInventory;

        this.membershipTypes = {
            xbox: 1,
            playstation: 2
        };
        this.apiKey = 'af5e4d8c07084d2bae22d053a646bb5d';


        this.defaultConfig = {
            headers: {
                "X-API-Key": this.apiKey
            }
        };

        ////////////////
        function getInventoryItem(inventoryId) {
            var url = this.baseSecureUrl+'Manifest/InventoryItem/'+inventoryId+'/?definitions=true';

            return $http
                .get(url, this.defaultConfig)
                .then(function(response) {
                    return response.data.Response.data.inventoryItem;
                })
        }

        function getPlayerDetails (playerName, platform) {
            var endpoint = this.baseSecureUrl+'SearchDestinyPlayer/';
            endpoint += this.membershipTypes[platform]+'/';
            endpoint += playerName+'/';

            return $http
                .get(endpoint, this.defaultConfig)
                .then(function(response) {
                    return response.data.Response;
                });

        }

        function getCharacters (playerId) {
            var endpoint = this.baseSecureUrl+this.membershipTypes.playstation+'/';
            endpoint += 'Account/';
            endpoint += playerId+'/';

            return $http
                .get(endpoint, this.defaultConfig)
                .then(function(response) {
                    return response.data.Response.data.characters;
                });         
        }

        function getInventory(playerId,characterId) {
            var endpoint = this.baseSecureUrl+this.membershipTypes.playstation+'/';
            endpoint += 'Account/';
            endpoint += playerId+'/';
            endpoint += 'Character/';
            endpoint += characterId+'/';
            endpoint += 'Inventory/Summary/';

            return $http
                .get(endpoint, this.defaultConfig)
                .then(function(response) {
                    return response.data.Response.data.items;
                }); 
        }

        function getEquipedItemBySlot() {

        }
        
    }
})();