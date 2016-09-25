'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/recipelist', {
      template: '<recipelist></recipelist>'
    });
}
