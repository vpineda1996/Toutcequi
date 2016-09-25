'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/shoppinglist', {
      template: '<shoppinglist></shoppinglist>'
    });
}
