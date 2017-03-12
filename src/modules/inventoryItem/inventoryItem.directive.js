(function() {
    'use strict';

    angular
        .module('app.inventoryItem')
        .directive('inventoryItem', inventoryItem);

    function inventoryItem() {
        var directive = {
            controller: 'InventoryItemController',
            controllerAs: 'vm',
            templateUrl: 'modules/inventoryItem/inventoryItem.html',
            scope: {
                item: "="
            },
            bindToController: true
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }

})();