module.exports = (err, req, res, pageOrPath, dataObject) => {
    if (err.name === 'CastError') {
        pageOrPath = '/404';
    }

    let formErrors = [];

    if (err instanceof Object === false) {
        formErrors.push(err);
    } else {

        if (err.code && err.code === 11000) {
            formErrors.push(`${getFieldName(err.errmsg)} already taken!`);
        }

        for (let field in err.errors) {
            formErrors.push(err.errors[field].message);
        }
    }

    if (pageOrPath !== '/404') {
        req.flash('errors', formErrors);
    }

    if (pageOrPath) {
        if (pageOrPath.startsWith('/')) {
            res.redirect(pageOrPath);
        } else {
            res.render(pageOrPath, dataObject);
        }
    } else {
        return res;
    }
};

function getFieldName(errorMsg) {
    let result = '';
    let propertyName;
    const wordsArr = errorMsg.split(' ');

    wordsArr.some(w => {
        if (w.indexOf('_1') !== -1) {
            propertyName = w;
            return true;
        }
    });

    propertyName = propertyName.slice(0, (propertyName.length - 2));

    for (let i = 0; i < propertyName.length; i++) {
        if (propertyName[i] === propertyName[i].toUpperCase()) {
            result += ' ';
        }

        result += propertyName[i];
    }

    return result.charAt(0).toUpperCase() + result.slice(1);
}