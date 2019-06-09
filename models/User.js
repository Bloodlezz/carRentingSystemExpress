const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Username is required!'],
        unique: true
    },
    salt: {
        type: mongoose.Schema.Types.String
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Password is required!']
    },
    firstName: {
        type: mongoose.Schema.Types.String,
        required: [true, 'First name is required!']
    },
    lastName: {
        type: mongoose.Schema.Types.String
    },
    roles: [
        {type: mongoose.Schema.Types.String}
    ]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.password;
    },
    addRole: function (role) {
        this.roles.push(role);

        return this;
    }
});

userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        const salt = encryption.generateSalt();
        user.salt = salt;
        user.password = encryption.generateHashedPassword(salt, user.password);
        next();
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

// Creates an admin at initialization
User.seedAdminUser = async () => {
    try {
        const users = await User.find({});
        if (0 < users.length) {
            return;
        }
        //
        // const salt = encryption.generateSalt();
        // const hashedPass = encryption.generateHashedPassword(salt, 'admin');

        return User.create({
            username: process.env.USERNAME,
            firstName: process.env.FIRST_NAME,
            lastName: process.env.LAST_NAME,
            password: process.env.PASSWORD,
            roles: ['Admin']
        })
    } catch (err) {
        console.log(err);
    }
};

module.exports = User;
