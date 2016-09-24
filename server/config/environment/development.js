'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'postgres://<username>:<password>@localhost:5432/hackathon'
  },

  // Seed database on startup
  seedDB: true

};
