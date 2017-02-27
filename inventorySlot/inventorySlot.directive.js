(function() {
    'use strict';

    angular
        .module('app.inventorySlot')
        .directive('inventorySlot', inventorySlot);

    function inventorySlot() {
        var directive = {
            controller: 'InventorySlotController',
            controllerAs: 'vm',
            templateUrl: 'modules/inventorySlot/inventorySlot.html',
            scope: {
                items: "="
            },
            bindToController: true
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }

})();