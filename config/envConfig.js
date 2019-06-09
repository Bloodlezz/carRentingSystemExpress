const path = require('path');

module.exports = {
    development: {
        dbPath: 'mongodb://localhost:27017/car-rental-db',
        port: process.env.PORT || 3000,
        rootPath: path.normalize(path.join(__dirname, '/../'))
    },
    production: {
        dbPath: process.env.DBPATH,
        port: process.env.PORT || 3000,
        rootPath: path.normalize(path.join(__dirname, '/../'))
    }
};