'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './recipelist.routes';

export interface RecipeElement {
  name: string;
  rating: number;
  imageThumbnail: string;
  _id: number;
  description: string;
  ingredients: any[];
  servingSize: number;
  steps: any[];
  info: any;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export class RecipelistComponent {
  message: string;
  recipes: RecipeElement[];
  $location;
  $scope;
  $http;
  test: string;
  $rootScope;
  expandedRecipe: RecipeElement;
  isExpandedRecipeNotVisible: boolean;

  constructor($http, $location, $scope, $rootScope) {
    'ngInject';
    this.$http = $http;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.expandedRecipe = null;
    this.isExpandedRecipeNotVisible = true;
    if (!this.$rootScope.recipes) {
      this.$location.path("/");
    }
  }

  $onInit () {
    // this.$http.get('http://172.25.96.206:3000/api/recipes').then(response => {
    //   this.recipes = response.data;
    // });
    this.recipes = this.$rootScope.recipes;
    this.$scope.range = createArray;
  }
  
  public onClick(recipe: RecipeElement) {
    // TODO, call
    this.expandedRecipe = recipe;
    $("#exended-recipe").addClass('show');
  }
}

function createArray(recipe: RecipeElement) {
    var input = [];
    for (var i = 0; i < recipe.rating; i++) input.push(i);
    return input;
}

export default angular.module('hackathonApp.recipelist', [ngRoute])
  .config(routes)
  .component('recipelist', {
    template: require('./recipelist.html'),
    controller: RecipelistComponent
  })
  .name;
