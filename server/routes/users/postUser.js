const joi = require('joi');
const db = require('../../utils/database');
const tittle = require('tittle');

module.exports = {
  method: 'POST',
  path: '/users',
  config: {
      validate: {
        payload: joi.object().keys({
          first_name: joi.string().token().required(),
          last_name: joi.string().token().required(),
          country_id: joi.number().integer().positive().required()
        })
      }
  },
  handler: async function (req, handler) {
    const query = db('users').insert({
      first_name: req.payload.first_name,
      last_name: req.payload.last_name,
      country_id: req.payload.country_id
    })
    [userId, errorQuery] = await tittle(query);
    if (errorQuery) {
        return handler.response({
            statusCode: 400,
            error: 'Something bad happened: + explicit error'
        }).code(400)
    }

    const returningQuery = db.select().from('users').where({id: userId})
    let [userData, errorReturningQuery] = await tittle(returningQuery);
    if (errorReturningQuery) {
      return handler.response({
          statusCode: 400,
          error: 'Something bad happened 2: + explicit error'
      }).code(400)
    }

    return handler.response({
        statusCode: 200,
        data: userData
    }).code(200)
  }
}
