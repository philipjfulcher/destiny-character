(function() {
'use strict';

    angular
        .module('app.inventoryItem')
        .controller('InventoryItemController', InventoryItemController);

    InventoryItemController.$inject = ['BungieAPI'];
    function InventoryItemController(BungieAPI) {
        var vm = this;
        
    }
})();