const Hapi = require('hapi');
const joi = require('joi');
const db = require('knex')({
    client: 'mysql',
    connection: process.env.DB
});

module.exports = {
  method: 'GET',
  path: '/users',
  handler: function (req, handler) {
    return db.select().from('users')
    .then( function (data) {
        return handler.response({
            statusCode: 200,
            data
        }).code(200)
    })
    .catch(error => {
        return handler.response({
            statusCode: 500,
            error
        }).code(500)
    })
  }
}
