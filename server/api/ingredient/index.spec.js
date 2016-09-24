'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ingredientCtrlStub = {
  index: 'ingredientCtrl.index',
  show: 'ingredientCtrl.show',
  create: 'ingredientCtrl.create',
  upsert: 'ingredientCtrl.upsert',
  patch: 'ingredientCtrl.patch',
  destroy: 'ingredientCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ingredientIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './ingredient.controller': ingredientCtrlStub
});

describe('Ingredient API Router:', function() {
  it('should return an express router instance', function() {
    expect(ingredientIndex).to.equal(routerStub);
  });

  describe('GET /api/ingredients', function() {
    it('should route to ingredient.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'ingredientCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/ingredients/:id', function() {
    it('should route to ingredient.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'ingredientCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/ingredients', function() {
    it('should route to ingredient.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'ingredientCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/ingredients/:id', function() {
    it('should route to ingredient.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'ingredientCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/ingredients/:id', function() {
    it('should route to ingredient.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'ingredientCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/ingredients/:id', function() {
    it('should route to ingredient.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'ingredientCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
