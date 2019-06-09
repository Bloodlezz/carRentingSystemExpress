const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = require('../models/User');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
};

module.exports = connectionStr => {
    return new Promise((resolve, reject) => {
        mongoose.connect(connectionStr, options, (err) => {
            if (err) {
                reject(err);
            }

            User.seedAdminUser()
                .then(() => {
                        resolve(console.log('Database ready'));
                    }
                )
                .catch(err => {
                    reject(err);
                });
        });
    });
};