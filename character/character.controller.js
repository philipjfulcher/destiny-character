(function() {
'use strict';

    angular
        .module('app.character')
        .controller('CharacterController', CharacterController);

    CharacterController.$inject = ['BungieAPI', '$q'];
    function CharacterController(BungieAPI, $q) {
        var vm = this;
        vm.title = "Character Screen";
        vm.characters = [];
        activate();
        
        vm.classTypes = {
            0: 'Titan',
            1: 'Hunter',
            2: 'Warlock',
            3: 'Unknown'
        };

        vm.slots = BungieAPI.dictionary.inventorySlots;

        ////////////////

        function activate() { 

                BungieAPI.getPlayerDetails('oldmarriedman').then(function(response) {
                    console.log(response);
                });
                
                BungieAPI.getCharacters('4611686018453514334').then(function(response) {
                    console.log(response);
                    vm.characters = response;

                    vm.characters.forEach(function(character) {
                        character.items = {
                            primary: []
                        };

                        BungieAPI.getInventory('4611686018453514334',character.characterBase.characterId).then(function(response) {
                            console.info(response);

                            var promises = [];

                            response.forEach(function(item) {
                                promises.push(BungieAPI.getInventoryItem(item.itemHash));
                            });

                            $q.all(promises).then(function(items) {
                                items.map(function(item) {
                                    switch(item.bucketTypeHash) {
                                        case vm.slots.primary:
                                            character.items.primary.push(item);
                                            break;
                                    }
                                });
                                
                            });
                        });
                    })
                });
        }
    }
})();