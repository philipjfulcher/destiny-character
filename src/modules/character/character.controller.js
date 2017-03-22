(function() {
'use strict';

    angular
        .module('app.character')
        .controller('CharacterController', CharacterController);

    CharacterController.$inject = ['BungieAPI', 'inventoryService', '$q'];
    function CharacterController(BungieAPI, inventoryService, $q) {
        var vm = this;

        activate();

        ////////////////

        function activate() { 
            getInventory();   
        }

        function getInventory (playerId) {
            inventoryService.getCharacterInventory(vm.platform, vm.playerId, vm.characterId).then(function(items) {
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