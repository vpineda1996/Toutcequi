'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './add.routes';

interface Ingredient {
  name: string;
  key: number;
}

export class AddComponent {
  keyCounter = 0;
  $scope;
  $location;
  steps = [];
  ingredients: Ingredient[] = [];
  /*@ngInject*/
  constructor($location, $scope) {
    this.$location = $location;
    this.$scope = $scope;
    this.ingredients.push({
      name: 'Tomatoes',
      key: this.keyCounter++
    });
    this.steps.push({
      number: 1,
      text: "Cut the tomato in half"
    });
  }

  $onInit() {
    this.attachScopeCallbacks();
  }

  private attachScopeCallbacks() {
    this.$scope.addIngredient = this.createIngredient.bind(this);
    this.$scope.removeIngredient = this.removeIngredient.bind(this);

    this.$scope.createStep = this.createStep.bind(this);
    this.$scope.removeStep = this.removeStep.bind(this);
  };

  private createIngredient() {
    this.ingredients.push({
      name: 'man',
      key: this.keyCounter++
    });
  }

  private removeIngredient(selectedIngredient: Ingredient) {
    let index;
    this.ingredients.forEach((ingredient: Ingredient, idx) => {
      if (ingredient.key === selectedIngredient.key) {
        index = idx;
      }
    });
    if (typeof index !== 'undefined') {
      this.ingredients.splice(index, 1);
    }
  }

  private createStep() {
    this.steps.push({
      name: 'man',
      key: this.keyCounter++
    });
  }

  private removeStep(selectedStep) {
    let index;
    this.steps.forEach((ingredient: Ingredient, idx) => {
      if (ingredient.key === selectedStep.key) {
        index = idx;
      }
    });
    if (typeof index !== 'undefined') {
      this.steps.splice(index, 1);
    }
  }
}


export default angular.module('hackathonApp.add', [ngRoute])
  .config(routes)
  .component('add', {
    template: require('./add.html'),
    controller: AddComponent,
    controllerAs: 'FormAddController'
  })
  .name;
