(function(angular) {
'use strict';

    angular
        .module('app.characterSelector')
        .controller('CharacterSelectorController', CharacterSelectorController);

    CharacterSelectorController.$inject = ['BungieAPI', '$q', '$routeParams', '$location'];
    function CharacterSelectorController(BungieAPI, $q, $routeParams, $location) {
        var vm = this;

        var platform = $routeParams.platform;
        var username = $routeParams.username;

        vm.classTypes = BungieAPI.dictionary.classTypes;
        vm.selectCharacter = selectCharacter;

        activate();

        function activate () {
            getCharacters();
        }


        function selectCharacter (character) {
            $location.path('/user/' + platform + '/' + username + '/character/' + character.characterBase.characterId);
        }

        //private functions
        function getCharacters () {
            BungieAPI.getPlayerDetails(username, platform).then(function(searchResults) {
                if(searchResults.length > 0) {
                    vm.playerDetails = searchResults[0];

                    BungieAPI.getCharacters(platform, vm.playerDetails.membershipId).then(function (Response) {
                        vm.characters = Response.data.characters;
                        vm.characterDefinitions = Response.definitions;
                    });
                }
            });
        }
        
        
        
    }
})(angular);