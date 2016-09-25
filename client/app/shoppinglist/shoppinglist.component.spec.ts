'use strict';

describe('Component: ShoppinglistComponent', function() {
  // load the controller's module
  beforeEach(module('hackathonApp.shoppinglist'));

  var ShoppinglistComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ShoppinglistComponent = $componentController('shoppinglist', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
