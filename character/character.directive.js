(function() {
    'use strict';

    angular
        .module('app.character')
        .directive('character', character);

    function character() {
        var directive = {
            controller: CharacterController,
            controllerAs: 'vm',
            templateUrl: 'modules/characters/character.html',
            scope: {},
            bindToController: true
        };
        return component;
        
        function link(scope, element, attrs) {
        }
    }

})();