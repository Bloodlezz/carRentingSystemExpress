const handlebars = require('express-handlebars');
const path = require('path');

module.exports = (app, rootPath) => {
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: require(path.join(rootPath, 'util/hbsHelpers'))
    }));

    app.set('view engine', '.hbs');
};