const joi = require('joi');
const db = require('../../utils/database');
const tittle = require('tittle');

module.exports = {
    method: 'GET',
    path: '/users',
    handler: async function (req, handler) {

        const query = db.select().from('users');
        let [users, error] = await tittle(query);
        if (error) {
            return handler.response({
                statusCode: 400,
                error: 'Something bad happened: + explicit error'
            }).code(400)
        }

        return handler.response({
            statusCode: 200,
            data: users
        }).code(200)
    }
}
