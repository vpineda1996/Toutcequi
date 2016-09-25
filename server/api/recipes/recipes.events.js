/**
 * Recipes model events
 */

'use strict';

import {EventEmitter} from 'events';
var Recipes = require('../../sqldb').Recipes;
var RecipesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RecipesEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Recipes.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    RecipesEvents.emit(event + ':' + doc._id, doc);
    RecipesEvents.emit(event, doc);
    done(null);
  };
}

export default RecipesEvents;
