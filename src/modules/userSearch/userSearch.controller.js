(function(angular) {
'use strict';

    angular
        .module('app.userSearch')
        .controller('UserSearchController', UserSearchController);

    UserSearchController.$inject = ['BungieAPI', '$q', '$location'];
    function UserSearchController(BungieAPI, $q, $location) {
        var vm = this;
        vm.platform = "";
        vm.searchText = "";
        vm.platforms = BungieAPI.platforms;

        vm.doingSearch = false;

        vm.searchForUser = function() {
            vm.doingSearch = true;
            BungieAPI.getPlayerDetails(vm.searchText, vm.platform).then(function(searchResults) {
                vm.searchResults = searchResults;
                vm.doingSearch = false;
                if(searchResults.length > 0) {
                    $location.path('/user/' + vm.platform + '/' + searchResults[0].displayName)
                }
            });
        }
        
    }
})(angular);