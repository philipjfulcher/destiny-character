(function() {
    'use strict';

    angular
        .module('app.userSearch')
        .directive('userSearch', userSearch);

    function userSearch() {
        var directive = {
            controller: UserSearchController,
            controllerAs: 'vm',
            templateUrl: 'modules/userSearch/userSearch.html',
            scope: {},
            bindToController: true
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }

})();