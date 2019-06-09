const path = require('path');

module.exports = {
    development: {
        dbPath: 'mongodb://localhost:27017/car-rental-db',
        port: process.env.PORT || 3000,
        rootPath: path.normalize(path.join(__dirname, '/../'))
    },
    production: {
        dbPath: 'mongodb://heroku_2x7j20dq:s4qg3qr7tojmorfhd67q1qvv67@ds235437.mlab.com:35437/heroku_2x7j20dq',
        port: process.env.PORT || 3000,
        rootPath: path.normalize(path.join(__dirname, '/../'))
    }
};