angular
  .module('app')
  .config(['$routeProvider',
    function ($routeProvider) {

      $routeProvider
        .when('/', {
          templateUrl: 'modules/userSearch/userSearch.html',
          controller: 'UserSearchController',
          controllerAs: 'vm'
        })
        // .when('/user/:platform/:username', {
        //   templateUrl: 'modules/characterSelect/characterSelect.html',
        //   controller: 'UserSearchController',
        //   controllerAs: 'vm'
        // })
        // .when('/user/:platform/:username/character/:characterId', {
        //     templateUrl: 'modules/character/character.html',
        //     controller: 'CharacterController',
        //     controllerAs: 'vm'
        // })
        .otherwise('/');
    }
  ]);