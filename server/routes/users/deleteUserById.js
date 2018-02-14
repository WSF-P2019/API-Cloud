const joi = require('joi');
const db = require('../../utils/database');
const tittle = require('tittle');

module.exports = {
  method: 'DELETE',
  path: '/users/{id}',
  config: {
      validate: {
          params: joi.object().keys({
              id: joi.number().integer().positive().required()
          })
      }
  },
  handler: async function (req, handler) {

    const query = db.delete().from('users').where({id: req.params.id}) // We are passing an object to authorized multiple conditions
    let [isDeleted, error] = await tittle(query);
    if (error) {
        return handler.response({
            statusCode: 400,
            error: 'Something bad happened: + explicit error'
        }).code(400)
    }

    return handler.response({
        statusCode: 200,
        data: isDeleted
    }).code(200)
  }
}
