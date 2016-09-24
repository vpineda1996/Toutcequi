'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var recipesCtrlStub = {
  index: 'recipesCtrl.index',
  show: 'recipesCtrl.show',
  create: 'recipesCtrl.create',
  upsert: 'recipesCtrl.upsert',
  patch: 'recipesCtrl.patch',
  destroy: 'recipesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var recipesIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './recipes.controller': recipesCtrlStub
});

describe('Recipes API Router:', function() {
  it('should return an express router instance', function() {
    expect(recipesIndex).to.equal(routerStub);
  });

  describe('GET /api/recipes', function() {
    it('should route to recipes.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'recipesCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/recipes/:id', function() {
    it('should route to recipes.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'recipesCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/recipes', function() {
    it('should route to recipes.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'recipesCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/recipes/:id', function() {
    it('should route to recipes.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'recipesCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/recipes/:id', function() {
    it('should route to recipes.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'recipesCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/recipes/:id', function() {
    it('should route to recipes.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'recipesCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
