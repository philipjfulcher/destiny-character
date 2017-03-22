angular
    .module('app.character')
    .directive('character', character);

function character() {
    var directive = {
        restrict: 'E',
        templateUrl: 'modules/character/character.html',
        scope: {
            platform: '=',
            playerId: '=',
            characterId: '=',
        },
        link: linkFunc,
        controller: 'CharacterController',
        controllerAs: 'vm',
        bindToController: true // because the scope is isolated
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {

    }
}