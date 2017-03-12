(function() {
'use strict';

    angular
        .module('app.character')
        .controller('CharacterController', CharacterController);

    CharacterController.$inject = ['BungieAPI', 'inventoryService', '$q', '$routeParams'];
    function CharacterController(BungieAPI, inventoryService, $q, $routeParams) {
        var vm = this;
                 
        var platform = $routeParams.platform;
        var username = $routeParams.username;
        var characterId = $routeParams.characterId;
        var playerId;

        activate();

        ////////////////

        function activate() { 
            getPlayerId().then(function (playerId) {
                playerId = playerId;
                getInventory(playerId);
            });
            
        }

        function getInventory (playerId) {
            inventoryService.getCharacterInventory(platform, playerId, characterId).then(function(items) {
                vm.items = items;
            });
        }
        ///private functions
        function getPlayerId () {
            return BungieAPI.getPlayerDetails(username, platform).then(function(searchResults) {
                return searchResults[0].membershipId;
            });
        }
    }
})();