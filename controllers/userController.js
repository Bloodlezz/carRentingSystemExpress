const errorHandler = require('../util/errorHandler');

const User = require('../models/User');
const Rent = require('../models/Rent');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    registerPost: (req, res) => {
        const formData = req.body;

        if (formData.password !== formData.repeatPassword) {
            errorHandler('Passwords don\'t match!', req, res, 'user/register', formData);
            return;
        }

        delete formData.repeatPassword;
        const newUser = new User(formData);
        newUser.addRole('User');

        newUser.save()
            .then(user => {
                req.login(user, err => {
                    if (err) {
                        errorHandler(err, req, res, 'user/register', formData);
                    } else {
                        req.flash('success', 'User registered successfully');
                        res.redirect('/');
                    }
                });
            })
            .catch(err => {
                errorHandler(err, req, res, 'user/register', formData);
            });
    },
    loginGet: (req, res) => {
        res.render('user/login');
    },
    loginPost: async (req, res) => {
        const {username, password} = req.body;

        if (username === '') {
            errorHandler('Username is required!', req, res, 'user/login');
            return;
        }

        User.findOne({username})
            .then(user => {
                if (user === null) {
                    errorHandler('Username does not exists!', req, res, 'user/login', {username});
                    return;
                }

                if (user.authenticate(password) === false) {
                    errorHandler('Invalid password', req, res, 'user/login', {username});
                    return;
                }

                req.login(user, err => {
                    if (err) {
                        errorHandler(err, res, 'user/login', {username});
                    } else {
                        res.redirect('/');
                    }
                })
            })
            .catch(err => {
                console.log(err);
                errorHandler(err, res, 'user/login', {username});
            });
    },
    logout: (req, res) => {
        req.logOut();
        req.session.destroy(err => {
            if (err) {
                console.log(err);
                return;
            }

            res.clearCookie('connect.sid');
            res.redirect('/');
        })
    },
    rentsGet: (req, res) => {
        const userId = req.user._id;

        Rent.find({user: userId})
            .populate('car')
            .sort({'createdAt': -1})
            .then(rents => {
                res.render('user/rented', {rents});
            })
            .catch(err => {
                errorHandler(err, req, res, 'user/rented');
            });
    },
    usersRightsGet: (req, res) => {
        User.find({})
            .then(users => {
                res.locals.script = '/assets/roleEdit.js';
                res.render('user/usersRights', {users});
            })
            .catch(err => {
                console.log(err);
            });
    },
    usersRightsPost: (req, res) => {
        const id = req.params.id;
        const {role, status} = req.body;

        User.findById(id)
            .then(user => {
                let updatedRoles = user.roles;
                if (role === '1') {
                    if (status === 'on' && updatedRoles.indexOf('Admin') === -1) {
                        updatedRoles.push('Admin');
                    } else if (status === 'off') {
                        updatedRoles.splice(updatedRoles.indexOf('Admin'), 1);
                    }
                } else if (role === '2') {
                    if (status === 'on' && updatedRoles.indexOf('User') === -1) {
                        updatedRoles.push('User');
                    } else if (status === 'off') {
                        updatedRoles.splice(updatedRoles.indexOf('User'), 1);
                    }
                }

                User.updateOne({_id: user._id}, {roles: updatedRoles})
                    .then(() => {
                        res.end()
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }
};