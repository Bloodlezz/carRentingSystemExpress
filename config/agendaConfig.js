const Agenda = require('agenda');
const Car = require('../models/Car');

const dateFormat = require('dateformat');

module.exports = ((dbPath) => {
    const agenda = new Agenda({
        db: {
            address: dbPath,
            options: {useNewUrlParser: true}
        }
    });

    agenda.define('detectExpiredRents', {priority: 'high'}, () => {
        Car.find({isRented: true})
            .populate('rent')
            .then((cars) => {
                if (cars.length !== 0) {
                    for (let car of cars) {
                        if (new Date(car.rent.expires).getTime() - Date.now() <= 0) {
                            Car.findOneAndUpdate(car._id, {isRented: false, rent: ''})
                                .then(() => {
                                    console.log(`[${dateFormat(Date.now(), "dd-mm-yyyy @ HH:MM")}] Car with ID ${car._id} is free for rent.`);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        }
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    });

    (async function () {
        await agenda.start();
        await agenda.every('1 hour', 'detectExpiredRents');
    })();
});