const Hapi = require('hapi');
const joi = require('joi');
const db = require('knex')({
    client: 'mysql',
    connection: process.env.DB
});

module.exports = {
  method: 'GET',
  path: '/users/{id}',
  config: {
      validate: {
          params: joi.object().keys({
              id: joi.number().integer().positive().required()
          })
      }
  },
  handler: function (req, handler) {
    return db.select().from('users').where({
        id: req.params.id // We are passing an object to authorized multiple conditions
      })
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
