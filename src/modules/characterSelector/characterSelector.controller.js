(function(angular) {
'use strict';

    angular
        .module('app.characterSelector')
        .controller('CharacterSelectorController', CharacterSelectorController);

    CharacterSelectorController.$inject = ['BungieAPI', '$q', '$routeParams', '$location', '$timeout'];
    function CharacterSelectorController(BungieAPI, $q, $routeParams, $location, $timeout) {
        var vm = this;
        var username = $routeParams.username;

        vm.platform = $routeParams.platform;

        vm.selectCharacter = selectCharacter;

        activate();

        function activate () {
            getCharacters();
        }


        function selectCharacter (character) {
            vm.selectedCharacterId = null;
            $timeout(function() {
                vm.selectedCharacterId = character.characterBase.characterId;
            });
        }

        //private functions
        function getCharacters () {
            BungieAPI.getPlayerDetails(username, vm.platform).then(function(searchResults) {
                if(searchResults.length > 0) {
                    vm.playerDetails = searchResults[0];

                    BungieAPI.getCharacters(vm.platform, vm.playerDetails.membershipId).then(function (Response) {
                        vm.characters = Response.data.characters;
                        vm.characterDefinitions = Response.definitions;
                    });
                }
            });
        }
        
        
        
    }
})(angular);