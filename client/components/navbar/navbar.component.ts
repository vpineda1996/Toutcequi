'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');
/**
 * A super ingredient
 */
interface IngredientObject {
  newIngredient: string;
};

interface FormOptions {
  threshold: string
};

export class NavbarComponent {
  menu = [{
    'title': 'Home',
    'link': '/'
  }];
  ingredient: IngredientObject;
  formOptions: FormOptions
  $location;
  $scope;
  $rootScope;
  $http;
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;
  ingredientTags: Array<string> = [];
  getMatchingRecipes: Function;
  showSearchEmptyError = false;
  baseUrl: string;

  constructor($rootScope, $location, $scope, $http, dmService, Auth) {
    'ngInject';
    'ngAnimate';
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.$http = $http;
    this.baseUrl = 'http://172.25.97.63:3000';
    $(function () {
      $('[data-toggle="popover"]').popover()
    })
  }

  isActive(route) {
    return route === this.$location.path();
  }

  addNewIngredient() {
    var sNewIngredient = this.$scope.ingredient.newIngredient;
    sNewIngredient = sNewIngredient[0].toUpperCase() + sNewIngredient.slice(1);
    this.ingredientTags.push(sNewIngredient);
    this.$scope.ingredient.newIngredient = '';
  }

  removeIngredient(index) {
    this.ingredientTags.splice(index, 1);
  }

  getRecipes() {
    if (this.ingredientTags.length === 0) {
      this.showSearchEmptyError = true;
    } else {
      this.showSearchEmptyError = false;
      var oParams = {
        ingredients: this.ingredientTags,
        threshold: parseInt(this.$scope.showSearchEmptyError, 10) || 0
      }
      // this.$http.get(this.baseUrl + '/api/recipes').then(response => {
      //   console.log(response);
      // });
      this.$rootScope.recipeResults = [{recipe: 'a good one!!!'}];
      this.$location.path('/recipelist');
    }
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;