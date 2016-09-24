'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'postgres://hackathon:hackathon@localhost:5432/hackathon2016'
  },

  // Seed database on startup
  seedDB: true

};
