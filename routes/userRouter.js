const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const restrictedPages = require('../config/auth');

userRouter
    .get('/register', restrictedPages.isAnonymous, userController.registerGet)
    .post('/register', restrictedPages.isAnonymous, userController.registerPost)
    .get('/login', restrictedPages.isAnonymous, userController.loginGet)
    .post('/login', restrictedPages.isAnonymous, userController.loginPost)
    .post('/logout', restrictedPages.isAuthed, userController.logout)
    .get('/users-rights',
        restrictedPages.isAuthed,
        restrictedPages.hasRole('Admin'),
        userController.usersRightsGet)
    .post('/users-rights/:id',
        restrictedPages.isAuthed,
        restrictedPages.hasRole('Admin'),
        userController.usersRightsPost)
    .get('/rents', restrictedPages.isAuthed, userController.rentsGet);

module.exports = userRouter;