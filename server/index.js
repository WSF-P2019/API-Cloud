'use strict';

const Hapi = require('hapi');

const db = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'roooot',
        database : 'wsf'
    }
});

// db.select().from('users').where({
//     country_id: 22
// })
//     .then((data) => {
//         console.log(`Data:`);
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(`Error: + ${error}`);
//     })

const server = new Hapi.Server({
    host: 'localhost',
    port: 8000
});

server.route({
  method: 'GET',
  path: '/users',
  handler: async function (request, handler) {
    return db.select().from('users')
    .then( function (users) {
        return handler.response({
            statusCode: 200,
            data: users})
            .code(200)
    })
    .catch(err => {
        return handler.response({
            statusCode: 500,
            error: err})
            .code(500)
    })
  }
});

async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
