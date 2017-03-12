(function(angular) {
    'use strict';

    angular.module('app', [
        'ngRoute',
        'app.character',
        'app.inventoryItem',
        'app.bungieAPI',
        'app.userSearch',
        'app.characterSelector'
    ]);

})(angular);