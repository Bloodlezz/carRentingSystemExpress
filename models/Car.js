const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model: {
        type: mongoose.SchemaTypes.String,
        required: [true, 'Car model is required!']
    },
    image: {
        type: mongoose.SchemaTypes.String,
        required: [true, 'Image URL required!']
    },
    pricePerDay: {
        type: mongoose.SchemaTypes.Number,
        required: [true, 'Price per day is required!'],
        validate: {
            validator: (value) => {
                if (value <= 0) {
                    throw new Error('Price per day must be bigger than 0!')
                }
            }
        }
    },
    isRented: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false
    },
    rent: {
        type: mongoose.SchemaTypes.Object,
        ref: 'Rent'
    }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;