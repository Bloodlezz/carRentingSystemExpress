const express = require('express');

const envConfig = require('./config/envConfig');
const initDb = require('./config/dbConfig');
const initMiddleware = require('./config/middlewareConfig');
const initViews = require('./config/viewsConfig');
const initPassport = require('./config/passport');
const initRoutes = require('./config/routesConfig');
const initAgenda = require('./config/agendaConfig');


const env = process.env.NODE_ENV || 'development';
const envOptions = envConfig[env];

const app = express();

initMiddleware(app, envOptions.rootPath);
initViews(app, envOptions.rootPath);
initPassport();
initRoutes(app);
initAgenda(envOptions.dbPath);

initDb(envOptions.dbPath)
    .then(() => {
        app.listen(envOptions.port, () => {
            console.log(`Server running @ port: ${envOptions.port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });