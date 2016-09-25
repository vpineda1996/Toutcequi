'use strict';

var app = require('../..');
import request from 'supertest';

var newIngredient;

describe('Ingredient API:', function() {
  describe('GET /api/ingredients', function() {
    var ingredients;

    beforeEach(function(done) {
      request(app)
        .get('/api/ingredients')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          ingredients = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(ingredients).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/ingredients', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ingredients')
        .send({
          name: 'New Ingredient',
          info: 'This is the brand new ingredient!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newIngredient = res.body;
          done();
        });
    });

    it('should respond with the newly created ingredient', function() {
      expect(newIngredient.name).to.equal('New Ingredient');
      expect(newIngredient.info).to.equal('This is the brand new ingredient!!!');
    });
  });

  describe('GET /api/ingredients/:id', function() {
    var ingredient;

    beforeEach(function(done) {
      request(app)
        .get(`/api/ingredients/${newIngredient._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          ingredient = res.body;
          done();
        });
    });

    afterEach(function() {
      ingredient = {};
    });

    it('should respond with the requested ingredient', function() {
      expect(ingredient.name).to.equal('New Ingredient');
      expect(ingredient.info).to.equal('This is the brand new ingredient!!!');
    });
  });

  describe('PUT /api/ingredients/:id', function() {
    var updatedIngredient;

    beforeEach(function(done) {
      request(app)
        .put(`/api/ingredients/${newIngredient._id}`)
        .send({
          name: 'Updated Ingredient',
          info: 'This is the updated ingredient!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedIngredient = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedIngredient = {};
    });

    it('should respond with the original ingredient', function() {
      expect(updatedIngredient.name).to.equal('New Ingredient');
      expect(updatedIngredient.info).to.equal('This is the brand new ingredient!!!');
    });

    it('should respond with the updated ingredient on a subsequent GET', function(done) {
      request(app)
        .get(`/api/ingredients/${newIngredient._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let ingredient = res.body;

          expect(ingredient.name).to.equal('Updated Ingredient');
          expect(ingredient.info).to.equal('This is the updated ingredient!!!');

          done();
        });
    });
  });

  describe('PATCH /api/ingredients/:id', function() {
    var patchedIngredient;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/ingredients/${newIngredient._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Ingredient' },
          { op: 'replace', path: '/info', value: 'This is the patched ingredient!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedIngredient = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedIngredient = {};
    });

    it('should respond with the patched ingredient', function() {
      expect(patchedIngredient.name).to.equal('Patched Ingredient');
      expect(patchedIngredient.info).to.equal('This is the patched ingredient!!!');
    });
  });

  describe('DELETE /api/ingredients/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/ingredients/${newIngredient._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ingredient does not exist', function(done) {
      request(app)
        .delete(`/api/ingredients/${newIngredient._id}`)
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
