'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './shoppinglist.routes';

export class ShoppinglistComponent {
  $rootScope;
  $scope;
  shoppingList: Array<string> = [];
  /*@ngInject*/
  constructor($rootScope, $scope) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$scope.shoppingList = JSON.parse(localStorage.getItem('shoppingList')); 
  }

  public triggerChecked(index) {
    this.$scope.shoppingList[index].checked = !this.$scope.shoppingList[index].checked;
    this.updateLocalStorage();
  }

  public removeShoppingItem (index) {
    this.$scope.shoppingList.splice(index, 1);
    this.updateLocalStorage();
  }

  private updateLocalStorage () {
    localStorage.setItem("shoppingList", JSON.stringify(this.$scope.shoppingList));
  }
}

export default angular.module('hackathonApp.shoppinglist', [ngRoute])
  .config(routes)
  .component('shoppinglist', {
    template: require('./shoppinglist.html'),
    controller: ShoppinglistComponent
  })
  .name;
