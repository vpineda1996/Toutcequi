'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/add', {
      template: '<add></add>'
    });
}
