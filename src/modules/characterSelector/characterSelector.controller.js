(function(angular) {
'use strict';

    angular
        .module('app.characterSelector')
        .controller('CharacterSelectorController', CharacterSelectorController);

    CharacterSelectorController.$inject = ['BungieAPI', '$q', '$routeParams'];
    function CharacterSelectorController(BungieAPI, $q, $routeParams) {
        var vm = this;

        var platform = $routeParams.platform;
        var username = $routeParams.username;

        vm.classTypes = BungieAPI.dictionary.classTypes;

        activate();

        function activate () {
            getCharacters();

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