const dateFormat = require('dateformat');

module.exports = {
    checkIfRoleExists: function (roleName, rolesArr) {
        return rolesArr.indexOf(roleName) !== -1 ? 'checked' : '';
    },
    formatDate: function (date) {
        return dateFormat(date.getTime(), "dddd, mmmm dS, yyyy, HH:MM");
    },
    rentedTimeLeft: function (expires) {
        const msLeft = new Date(new Date(expires).getTime() - Date.now());

        const days = convertMS(msLeft).days;
        const hours = convertMS(msLeft).hours;
        const minutes = convertMS(msLeft).minutes;

        return `${days} days ${hours}:${minutes}`;
    },
    isExpired: function (expireDate) {
        return 0 < new Date(new Date(expireDate).getTime() - Date.now());
    },
    isRentedByUser: function (rentierId, userId) {
        return rentierId.equals(userId);
    }
};


function convertMS(milliseconds) {
    let days, hours, minutes, seconds;

    seconds = Math.floor(milliseconds / 1000);
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    days = Math.floor(hours / 24);
    hours = hours % 24;

    return {
        days,
        hours,
        minutes,
        seconds
    };
}