/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/recipes              ->  index
 * POST    /api/recipes              ->  create
 * GET     /api/recipes/:id          ->  show
 * PUT     /api/recipes/:id          ->  upsert
 * PATCH   /api/recipes/:id          ->  patch
 * DELETE  /api/recipes/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Recipes} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Recipess
export function index(req, res) {
  return Recipes.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Recipes from the DB
export function show(req, res) {
  return Recipes.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Recipes in the DB
export function create(req, res) {
  return Recipes.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Recipes in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Recipes.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Recipes in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Recipes.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Recipes from the DB
export function destroy(req, res) {
  return Recipes.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// model.find({
//   where: {
//     myJsonCol: {
//       '$contains': { browsers:[{name: "chrome"}] }
//     }
//   }
// })

// Gets all recipes given a list of ingredients in a json object
export function getRecipes(req, res){
  var sIngredients = req.query.ingredients;
  var aIngredients = sIngredients.split(','); // array of ingredients
  var iThreshold = 0; // maximum # of missing ingredients
  var sSortOn = req.query.sorton; // one of rating, highest missing ingredient, lowest
  var sFilter = req.query.filter; // One of category, time to cook, or difficulty
  return Recipes.findAll({
    where: {
      'ingredients': {
        overlap: aIngredients
      }
      // raw: true
      // [this.sequelize.fn('array_length', this.sequelize.col('ingredients'), 1)] : 1
    }
  })
  .then(filterThreshold(res))
  .then(respondWithResult(res))
  .catch(handleError(res));

  function filterThreshold(res){

    return function (aResultSet){
      // var aRecipeIngredients = oResultSet.rows;
      // var aFilteredIngredients = [];
      // aRecipeIngredients.forEach(function(oRecipe){
      //   var aDiff = aIngredients.filter(ingredient =>
      //     oRecipe.ingredients.indexOf(ingredient) < 0);
      //   if(aDiff.length <= iThreshold) {
      //     aFilteredIngredients.push.apply(oRecipe);
      //   }
      // })
      //
      // oResultSet.count = aFilteredIngredients.length;
      // oResultSet.rows = aFilteredIngredients;
      console.log(oResultSet); // Array of Data Values
      var aFilteredIngredients = [];
      aResultSet.forEach(function(oDataValue){
        var aDiff = oDataValue.ingredients.filter(ingredient =>
          aIngredients.indexOf(ingredient) < 0);

        if(aDiff.length <= iThreshold) {
          aFilteredIngredients.push.apply(oDataValue);
        }
      })
      return aFilteredIngredients;

    };

  }
}
