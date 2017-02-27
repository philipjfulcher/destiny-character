(function(angular) {
'use strict';

    angular
        .module('app.userSearch')
        .controller('UserSearchController', UserSearchController);

    UserSearchController.$inject = ['BungieAPI', '$q'];
    function UserSearchController(BungieAPI, $q) {
        var vm = this;
        vm.platform = "";
        vm.searchText = "";
        vm.platforms = [
            {
                label: "Xbox",
                value: "xbox"
            },
            {
                label: "PSN",
                value: "playstation"
            }
        ];
        vm.doingSearch = false;

        vm.searchForUser = function() {
            vm.doingSearch = true;
            BungieAPI.getPlayerDetails(vm.searchText, vm.platform).then(function(searchResults) {
                vm.searchResults = searchResults;
                vm.doingSearch = false;
            });
        }
        
    }
})(angular);