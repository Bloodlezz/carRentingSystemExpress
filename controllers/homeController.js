const Car = require('../models/Car');

module.exports = {
    index: (req, res) => {
        res.render('home/index');
    }
};