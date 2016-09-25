'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import {RecipeElement} from '../recipelist/recipelist.component';
import routes from './add.routes';

interface Ingredient {
  name: string;
  unit: string;
  key: number;
  number: number;
}

interface Step {
  text: string;
  number: number;
}

export class AddComponent {
  keyCounter = 0;
  stepCounter = 1;
  $scope;
  $location;
  $http;
  steps = [];
  recipeName: string;
  ingredients: Ingredient[] = [];
  imageLink = 'http://www.seriouseats.com/images/2015/04/20150429-tamales-red-chili-joshua-bousel.jpg';
  
  /*@ngInject*/
  constructor($location, $scope, $http) {
    this.$location = $location;
    this.$scope = $scope;
    this.$http = $http;

    this.ingredients.push({
      name: 'Tomatoes',
      unit: 'grams',
      key: this.keyCounter++,
      number: 1
    });

    this.steps.push({
      number: this.stepCounter++,
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

    this.$scope.submit = this.submit.bind(this);
  };

  private submit() {
    if(true /**valid */){
      let simpleIngredients = this.ingredients.map((ingredient: Ingredient) => ingredient.name);
      let completeIngredients = this.ingredients.map((ingredient: Ingredient) => 
        ingredient.number + ' ' + ingredient.unit + ' ' + ingredient.name);

      let joinSteps = this.steps.map((step: Step) => step.text);
      let oParams: RecipeElement = {
        name: this.recipeName,
        rating: 5,
        description: this.recipeName,
        ingredients: simpleIngredients,
        quantity: completeIngredients,
        servingSize: 5,
        steps: joinSteps,
        imageBackground: this.imageLink,
      };
      this.$http({
        method: 'POST',
        url: '/api/recipes/',
        data: oParams
      }).then((res) => {
        this.$location.path('/recipelist');
      });
    }
  }

  private createIngredient() {
    this.ingredients.push({
      name: 'man',
      unit: 'grams',
      key: this.keyCounter++,
      number: 1
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
      number: this.stepCounter++
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
    this.stepCounter--;
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
