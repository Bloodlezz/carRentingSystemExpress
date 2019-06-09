const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    days: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    car: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Car'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    expires: {
        type: mongoose.SchemaTypes.Date
    }
});

rentSchema.setupTimestamp(true);

// DATA CAN BE AUTO DELETED BY MONGODB AFTER PERIOD OF TIME
// rentSchema.index({"expires": 1 }, { expireAfterSeconds: 0 } );

const Rent = mongoose.model('Rent', rentSchema);

module.exports = Rent;