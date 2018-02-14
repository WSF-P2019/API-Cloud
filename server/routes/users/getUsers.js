const joi = require('joi');
const db = require('../../utils/database');

module.exports = {
    method: 'GET',
    path: '/users',
    handler: async function (req, handler) {
        let users = [];
        try{
            users = await db.select().from('users')
        } catch (error) {
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
