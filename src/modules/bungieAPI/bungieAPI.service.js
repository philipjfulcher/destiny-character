(function() {
'use strict';

    angular
        .module('app.bungieAPI')
        .service('BungieAPI', BungieAPI);

    BungieAPI.$inject = ['$http'];

    function BungieAPI($http) {
        this.baseUrl = 'www.bungie.net/d1/platform/Destiny/';
        this.baseInsecureUrl = 'http://'+this.baseUrl;
        this.baseSecureUrl = 'https://'+this.baseUrl;
        this.assetsUrl = 'http://www.bungie.net/';

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
            },
            classTypes: {
                0: 'Titan',
                1: 'Hunter',
                2: 'Warlock',
                3: 'Unknown'
            },
            genders: {
                0: 'Male',
                1: 'Female',
                3: 'Unknown'
            },
            races: {
                0: 'Human',
                1: 'Awoken',
                '898834093': 'Exo',
                3: 'Unknown'
            }
        }
        


        this.getInventoryItem = getInventoryItem;
        this.getPlayerDetails = getPlayerDetails;
        this.getCharacters = getCharacters;
        this.getInventory = getInventory;
        this.sendRequest = sendRequest;
        
        function sendRequest(method, endpoint, useSecureUrl, requestDefinitions) {
            var httpFunction;
            var url;

            if(useSecureUrl) {
                url = this.baseSecureUrl;
            } else {
                url = this.baseInsecureUrl;
            }

            url += endpoint;

            if(requestDefinitions) {
                url += '?definitions=true';
            }

            if($http[method]) {
                httpFunction = $http[method];

                return httpFunction(url, this.defaultConfig)
                    .then(function(response) {
                        return response.data.Response;
                    });
            }
        }

        this.platforms = [
            {
                label: "Xbox",
                membershipType: "1"
            },
            {
                label: "PSN",
                membershipType: "2"
            }
        ];

        this.apiKey = 'af5e4d8c07084d2bae22d053a646bb5d';


        this.defaultConfig = {
            headers: {
                "X-API-Key": this.apiKey
            }
        };

        ////////////////

        function getCharacterDefinitions () {
            var endpoint = this.baseSecureUrl + platforms[0].membershipType +'/';
            endpoint += 'Account/?definitions=true';
        }

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
            endpoint += platform + '/';
            endpoint += playerName + '/';

            return $http
                .get(endpoint, this.defaultConfig)
                .then(function(response) {
                    return response.data.Response;
                });

        }

        function getCharacters (platform, playerId) {
            var endpoint = this.baseSecureUrl + platform +'/';
            endpoint += 'Account/';
            endpoint += playerId+'/?definitions=true';

            return $http
                .get(endpoint, this.defaultConfig)
                .then(function(response) {
                    return response.data.Response;
                });         
        }

        function getInventory(platform, playerId,characterId) {
            var endpoint = this.baseSecureUrl+platform+'/';
            endpoint += 'Account/';
            endpoint += playerId+'/';
            endpoint += 'Character/';
            endpoint += characterId+'/';
            endpoint += 'Inventory/Summary/?definitions=true';

            return $http
                .get(endpoint, this.defaultConfig)
                .then(function(response) {
                    return response.data.Response;
                }); 
        }

        function getEquipedItemBySlot() {

        }
        
    }
})();