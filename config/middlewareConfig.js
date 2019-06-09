const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('express-flash');

module.exports = (app, rootPath) => {
    app.use(cookieParser());

    app.use(bodyParser.urlencoded({extended: true}));

    app.use(session({
        secret: 'kosioSecret',
        resave: false,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    // Set user to res.locals
    app.use((req, res, next) => {
        if (req.user) {
            res.locals.user = req.user;
        }
        next();
    });

    // Set isAdmin to res.locals
    app.use((req, res, next) => {
        if (req.user) {
            res.locals.isAdmin = req.user.roles.indexOf('Admin') !== -1;
        }
        next();
    });

    app.use(express.static(path.join(rootPath, 'static')));
};