'use strict';

/**
 * @ngdoc function
 * @name stopiasApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the stopiasApp
 */
angular.module('stopiasApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
