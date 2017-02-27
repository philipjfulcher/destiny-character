(function() {
'use strict';

    angular
        .module('app.inventorySlot')
        .controller('InventorySlotController', InventorySlotController);

    InventorySlotController.$inject = ['BungieAPI'];
    function InventorySlotController(BungieAPI) {
        var vm = this;
        
    }
})();