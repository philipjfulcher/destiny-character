(function() {
'use strict';

    angular
        .module('app.character')
        .controller('CharacterController', CharacterController);

    CharacterController.$inject = ['BungieAPI', '$q', '$routeParams'];
    function CharacterController(BungieAPI, $q, $routeParams) {
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
            BungieAPI.getInventory(platform, playerId, characterId).then(function(inventoryItems) {
                vm.inventoryItems = inventoryItems;
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