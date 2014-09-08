'use strict';

/**
 * @ngdoc overview
 * @name stopiasApp
 * @description
 * # stopiasApp
 *
 * Main module of the application.
 */
angular

.module('stopiasApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'app.main',
    'app.landing',
    'app.directives',
    'app.services'
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('main', {
            url: '/',
            controller: 'MainCtrl',
            templateUrl: 'scripts/main/main.html'
        })
        .state('landing', {
            url: '/landing',
            controller: 'LandingCtrl',
            templateUrl: 'scripts/landing/landing.html'
        });
})

.run(function($window, $log, $rootScope) {

    $rootScope.online = navigator.onLine;

    $window.addEventListener('offline', function() {
        $rootScope.$apply(function() {
            $log.info('app went offline');
            $rootScope.online = false;
        });
    }, false);

    $window.addEventListener('online', function() {
        $rootScope.$apply(function() {
            $log.info('app is back online');
            $rootScope.online = true;
        });
    }, false);
});