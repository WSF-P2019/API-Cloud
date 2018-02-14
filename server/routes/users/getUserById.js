const joi = require('joi');
const db = require('../../utils/database');
const tittle = require('tittle');

module.exports = {
  method: 'GET',
  path: '/users/{id}',
  config: {
      validate: {
          params: joi.object().keys({
            id: [
                joi.string().required(),
                joi.number().integer().positive().required()
            ]
          })
      }
  },
  handler: async function (req, handler) {

    const query = db.select().from('users').where({id: req.params.id}) // We are passing an object to authorized multiple conditions
    let [user, error] = await tittle(query);
    if (error) {
        return handler.response({
            statusCode: 400,
            error: 'Something bad happened: + explicit error'
        }).code(400)
    }

    return handler.response({
        statusCode: 200,
        data: user[0]
    }).code(200)
  }
}
