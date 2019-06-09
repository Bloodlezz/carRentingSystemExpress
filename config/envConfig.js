const path = require('path');

module.exports = {
    development: {
        dbPath: 'mongodb://localhost:27017/car-rental-db',
        port: process.env.PORT || 3000,
        rootPath: path.normalize(path.join(__dirname, '/../'))
    },
    production: {
        dbPath: 'server_path',
        // TODO В ТЕРМИНАЛА ПИШЕМ NODE И АКО НАПИШЕМ ПОСЛЕ process.env ЩЕ ВИДИМ ВСИЧКИ ПРОЦЕСИ КОИТО СА В ЕНВ СЕТИНГСА НА УЙНДОУСА !!! И СЪЩО ТАКА МОЖЕМ ДА СЕТНЕМ ЕНВАЕРМЕНТА: $env:NODE_ENV="development"
        port: process.env.PORT || 3000,
        rootPath: path.normalize(path.join(__dirname, '/../'))
    }
};