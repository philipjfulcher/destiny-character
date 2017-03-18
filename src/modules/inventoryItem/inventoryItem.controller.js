(function() {
'use strict';

    angular
        .module('app.inventoryItem')
        .controller('InventoryItemController', InventoryItemController);

    InventoryItemController.$inject = ['BungieAPI'];
    function InventoryItemController(BungieAPI) {
        var vm = this;

        vm.hoverOverVisible = false;
        vm.headerTierClasses = {
            'tier-exotic': vm.item.tier.type == 6,
            'tier-legendary': vm.item.tier.type == 5
        };
        vm.showInventoryIconHoverOver = showInventoryIconHoverOver;

        function showInventoryIconHoverOver(isVisisble) {
            vm.hoverOverVisible = isVisisble;
        }
        
    }
})();