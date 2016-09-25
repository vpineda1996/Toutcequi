'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
const $ = require('jquery');


import routes from './recipelist.routes';

export interface RecipeElement {
  name: string;
  rating: number;
  imageThumbnail?: string;
  imageBackground?: string;
  _id?: number;
  description: string;
  ingredients: string[];
  servingSize: number;
  steps: any[];
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  quantity: string[];
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
      this.$http({
        url: 'http://10.10.32.153:3000/api/recipes',
        method: 'GET'
      }).then(response => {
        this.recipes = response.data;
      });
    }
  }

  $onInit() {

    this.recipes = this.$rootScope.recipes;
    this.$scope.range = createArray;
  }

  public onClick(recipe: RecipeElement) {
    this.expandedRecipe = recipe;
    $("#exended-recipe").addClass('show');
  }

  public closeExtenedPopup() {
    $("#exended-recipe").removeClass('show');
  }

  public addToShoppingList(index) {
    if (!this.$rootScope.shoppingList) {
      this.$rootScope.shoppingList = [];
    }
    var missingIngredient = this.expandedRecipe.ingredients[index];
    this.$rootScope.shoppingList.push(missingIngredient);
    console.log(this.$rootScope.shoppingList);
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
