angular.module('starter', ['ionic', 'ionic.wheel','starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
    url: '/home',
    templateUrl: 'templates/menu.html',
    controller: 'MainCtrl'
  })
    .state('dice', {
    url: '/dice',
    templateUrl: 'templates/dice.html',
    controller: 'DiceCtrl'
  })
    .state('lifepoints', {
    url: '/lifepoints',
    templateUrl: 'templates/lifepoints.html',
    controller: 'LifepointsCtrl'
  })
    .state('timer', {
    url: '/timer',
    templateUrl: 'templates/timer.html',
    controller: 'TimerCtrl'
  })

  $urlRouterProvider.otherwise('/home');
})