'use strict';

/**
 * @ngdoc function
 * @name stopiasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stopiasApp
 */
angular.module('stopiasApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
