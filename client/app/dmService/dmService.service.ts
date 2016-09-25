'use strict';
const angular = require('angular');

/*@ngInject*/

export function dmServiceService($http) {
  'ngInject';
  var baseUrl = 'localhost/api/';
  var serviceApi = {
    getMatchingRecipes (oParams) {
      console.log(oParams);
    }
  }

  return serviceApi;

}

export default angular.module('hackathonApp.dmService', [])
  .factory('dmService', dmServiceService)
  .name;
