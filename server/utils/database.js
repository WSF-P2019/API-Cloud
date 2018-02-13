'use strict';

module.exports = require('knex')({
  client: 'mysql',
  connection: process.env.DB
});
