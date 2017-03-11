(function(angular) {
'use strict';

    angular
        .module('app.characterSelector')
        .controller('CharacterBlockController', CharacterBlockController);

    CharacterBlockController.$inject = ['BungieAPI'];
    function CharacterBlockController(BungieAPI) {
        var vm = this;

        activate();

        function activate() {
            vm.backgroundPath = 'http://www.bungie.net/' + vm.character.backgroundPath;
            vm.emblemPath = 'http://www.bungie.net/' + vm.character.emblemPath;
            vm.class = vm.definitions.classes[vm.character.characterBase.classHash].className;
            vm.gender = vm.definitions.genders[vm.character.characterBase.genderHash].genderName;
            vm.race = vm.definitions.races[vm.character.characterBase.raceHash];

            vm.raceGender = vm.race['raceName' + vm.gender];
        }
        
    }
})(angular);