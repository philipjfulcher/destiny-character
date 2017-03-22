angular
    .module('app.characterSelector')
    .directive('characterBlock', characterBlock);

function characterBlock() {
    var directive = {
        restrict: 'E',
        templateUrl: 'modules/characterBlock/characterBlock.html',
        scope: {
            character: '=',
            definitions: '='
        },
        link: linkFunc,
        controller: 'CharacterBlockController',
        controllerAs: 'vm',
        bindToController: true // because the scope is isolated
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {

    }
}