const joi = require('joi');
const db = require('../../utils/database');
const tittle = require('tittle');

module.exports = {
    method: 'GET',
    path: '/users',
    config: {
        validate: {
            query: joi.object().keys({
              page: [
                  joi.string().required(),
                  joi.number().integer().positive().required()
              ]
            })
        }
    },
    handler: async function (req, handler) {
        const pageNumber = parseInt(req.query.page) - 1;

        const query = db.select()
            .from('users')
            .limit(10)
            .offset(pageNumber * 10);
        let [users, error] = await tittle(query);
        if (error) {
            return handler.response({
                statusCode: 400,
                error: 'Something bad happened: + explicit error'
            }).code(400)
        }

        return handler.response({
            statusCode: 200,
            data: users,
            links: {
                previous: pageNumber ? `http://localhost:8000/users?page=${pageNumber}` : null,
                next: `http://localhost:8000/users?page=${pageNumber + 2}`
            }
        }).code(200)
    }
}
