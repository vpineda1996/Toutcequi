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
  threshold: string;
};

export class NavbarComponent {
  menu = [{
    'title': 'Home',
    'link': '/'
  },{
    'title': 'Add Recipe',
    'link': '/add'
  }];
  ingredient: IngredientObject;
  formOptions: FormOptions;
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
  $route;
  hideIngredientPane = false;

  constructor($rootScope, $location, $scope, $http, $route, Auth) {
    'ngInject';
    'ngAnimate';
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.$http = $http;
    this.$route = $route;
  }

  isActive(route) {
    if (this.$location.path() === '/login' || this.$location.path() === '/signup' || this.$location.path() === '/add') {
        this.hideIngredientPane = true;
    } else {
      this.hideIngredientPane = false;
    }
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
    this.showSearchEmptyError = false;
    
    var oParams = {
      ingredients: this.ingredientTags.join(),
      threshold: parseInt(this.$scope.formOptions.threshold, 10) || 0
    };
    this.$http({
      url: 'http://10.10.32.153:3000/api/recipes/getRecipes',
      method: 'GET',
      params: oParams
    }).then(response => {
      this.$rootScope.recipes = response.data;
      if (this.$location.path() !== '/recipelist') {
        this.$location.path('/recipelist');
      } else {
        this.$route.reload();
      }
    });
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;