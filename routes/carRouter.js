const express = require('express');
const carRouter = express.Router();
const carController = require('../controllers/carController');
const restrictedPages = require('../config/auth');

carRouter
    .get('/all', restrictedPages.isAuthed, carController.allCars)
    .get('/add',
        restrictedPages.isAuthed,
        restrictedPages.hasRole('Admin'),
        carController.addGet)
    .post('/add', restrictedPages.hasRole('Admin'), carController.addPost)
    .get('/edit/:id', restrictedPages.hasRole('Admin'), carController.editGet)
    .post('/edit/:id', restrictedPages.hasRole('Admin'), carController.editPost)
    .get('/rent/:id', restrictedPages.isAuthed, carController.rentGet)
    .post('/rent/:id', restrictedPages.isAuthed, carController.rentPost)
    .get('/extend/:id', restrictedPages.isAuthed, carController.extendGet)
    .post('/extend/:id', restrictedPages.isAuthed, carController.extendPost)
    .get('/search', restrictedPages.isAuthed, carController.search);

module.exports = carRouter;