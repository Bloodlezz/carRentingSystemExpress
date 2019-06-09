const express = require('express');
const invalidRouter = express.Router();

invalidRouter
    .all('*', (req, res) => {
    res.status(404);
    res.render('home/404');
});

module.exports = invalidRouter;