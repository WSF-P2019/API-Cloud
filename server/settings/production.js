'use strict';

module.exports = {
  database: 'mysql://root:roooot@localhost:3306/wsf',
  http: {
    host: process.env.HOST || process.env.HOSTNAME || 'localhost',
    port: process.env.PORT || 8000
  }
}
