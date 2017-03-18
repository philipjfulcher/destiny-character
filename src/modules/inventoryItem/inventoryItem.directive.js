(function() {
    'use strict';

    angular
        .module('app.inventoryItem')
        .directive('inventoryItem', inventoryItem);
    
    inventoryItem.$inject = ['$window'];

    function inventoryItem($window) {
        var directive = {
            controller: 'InventoryItemController',
            controllerAs: 'vm',
            templateUrl: 'modules/inventoryItem/inventoryItem.html',
            scope: {
                item: "="
            },
            bindToController: true,
            link: link
        };
        return directive;
        
        function link(scope, element, attrs) {
            
            scope.vm.windowHeight = $window.innerHeight;
            scope.vm.elementTop = element[0].offsetTop;

            var positionFromBottom = scope.vm.windowHeight - scope.vm.elementTop - 370;

            if( positionFromBottom < 0) {
                scope.vm.topAdjustment = positionFromBottom;
            } else {
                scope.vm.topAdjustment = 0;
            }
        }
    }

})();