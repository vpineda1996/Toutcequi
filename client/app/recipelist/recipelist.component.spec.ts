'use strict';

describe('Component: RecipelistComponent', function() {
  // load the controller's module
  beforeEach(module('hackathonApp.recipielist'));

  var RecipelistComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    RecipelistComponent = $componentController('recipelist', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
