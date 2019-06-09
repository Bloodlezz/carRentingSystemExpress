module.exports = {
    isAuthed: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('../user/login');
        }
    },
    hasRole: (role) => (req, res, next) => {
        if (req.isAuthenticated() &&
            req.user.roles.indexOf(role) > -1) {
            next();
        } else {
            res.redirect('/404');
        }
    },
    isAnonymous: (req, res, next) => {
        if (req.isAuthenticated() === false) {
            next();
        } else {
            res.redirect('/');
        }
    }
};