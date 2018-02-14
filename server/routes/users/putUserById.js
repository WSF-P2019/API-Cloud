const joi = require('joi');
const db = require('../../utils/database');
const tittle = require('tittle');

module.exports = {
  method: 'PUT',
  path: '/users/{id}',
  config: {
      validate: {
        params: joi.object().keys({
          id: [
            joi.string().required(),
            joi.number().integer().positive().required()
          ]
        }),
        payload: joi.object().keys({
          first_name: joi.string(),
          last_name: joi.string(),
          is_admin: joi.boolean().default(false),
          website_url: joi.string().uri({
            scheme: ['http', 'https']
          }),
          country_id: joi.number().integer().positive()
        })
      }
  },
  handler: async function (req, handler) {

    const query = db('users').update({
      first_name: req.payload.first_name,
      last_name: req.payload.last_name,
      is_admin: req.payload.is_admin,
      website_url: req.payload.website_url,
      country_id: req.payload.country_id
    }).where({id: req.params.id});
    let [userId, error] = await tittle(query);
    if (error) {
        return handler.response({
            statusCode: 400,
            error: 'Something bad happened: + explicit error'
        }).code(400)
    }

    const returningQuery = db.select().from('users').where({id: req.params.id})
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
