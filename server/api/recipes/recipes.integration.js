'use strict';

var app = require('../..');
import request from 'supertest';

var newRecipes;

describe('Recipes API:', function() {
  describe('GET /api/recipes', function() {
    var recipess;

    beforeEach(function(done) {
      request(app)
        .get('/api/recipes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          recipess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(recipess).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/recipes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/recipes')
        .send({
          name: 'New Recipes',
          info: 'This is the brand new recipes!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRecipes = res.body;
          done();
        });
    });

    it('should respond with the newly created recipes', function() {
      expect(newRecipes.name).to.equal('New Recipes');
      expect(newRecipes.info).to.equal('This is the brand new recipes!!!');
    });
  });

  describe('GET /api/recipes/:id', function() {
    var recipes;

    beforeEach(function(done) {
      request(app)
        .get(`/api/recipes/${newRecipes._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          recipes = res.body;
          done();
        });
    });

    afterEach(function() {
      recipes = {};
    });

    it('should respond with the requested recipes', function() {
      expect(recipes.name).to.equal('New Recipes');
      expect(recipes.info).to.equal('This is the brand new recipes!!!');
    });
  });

  describe('PUT /api/recipes/:id', function() {
    var updatedRecipes;

    beforeEach(function(done) {
      request(app)
        .put(`/api/recipes/${newRecipes._id}`)
        .send({
          name: 'Updated Recipes',
          info: 'This is the updated recipes!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRecipes = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRecipes = {};
    });

    it('should respond with the original recipes', function() {
      expect(updatedRecipes.name).to.equal('New Recipes');
      expect(updatedRecipes.info).to.equal('This is the brand new recipes!!!');
    });

    it('should respond with the updated recipes on a subsequent GET', function(done) {
      request(app)
        .get(`/api/recipes/${newRecipes._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let recipes = res.body;

          expect(recipes.name).to.equal('Updated Recipes');
          expect(recipes.info).to.equal('This is the updated recipes!!!');

          done();
        });
    });
  });

  describe('PATCH /api/recipes/:id', function() {
    var patchedRecipes;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/recipes/${newRecipes._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Recipes' },
          { op: 'replace', path: '/info', value: 'This is the patched recipes!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedRecipes = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedRecipes = {};
    });

    it('should respond with the patched recipes', function() {
      expect(patchedRecipes.name).to.equal('Patched Recipes');
      expect(patchedRecipes.info).to.equal('This is the patched recipes!!!');
    });
  });

  describe('DELETE /api/recipes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/recipes/${newRecipes._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when recipes does not exist', function(done) {
      request(app)
        .delete(`/api/recipes/${newRecipes._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
