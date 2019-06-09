const Car = require('../models/Car');
const Rent = require('../models/Rent');

const msInOneDay = 86400000;

const errorHandler = require('../util/errorHandler');

module.exports = {
    allCars: (req, res) => {
        Car.find({isRented: false})
            .then(cars => {
                res.locals.script = '/assets/searchForms.js';
                res.render('car/all', {cars});
            })
            .catch(err => {
                errorHandler(err, req, res, 'car/all');
            });
    },
    addGet: (req, res) => {
        res.render('car/add');
    },
    addPost: (req, res) => {
        const formData = req.body;

        const newCar = new Car(formData);
        newCar.pricePerDay = Number(newCar.pricePerDay);

        newCar.save()
            .then(() => {
                req.flash('success', 'Car added successfully');
                res.redirect('/car/all');
            })
            .catch(err => {
                errorHandler(err, req, res, 'car/add', formData);
            });
    },
    editGet: (req, res) => {
        const currentId = req.params.id;

        Car.findById(currentId)
            .then(car => {
                res.render('car/edit', car);
            })
            .catch(err => {
                errorHandler(err, req, res);
            });
    },
    editPost: (req, res) => {
        const currentId = req.params.id;
        const formData = req.body;

        const car = new Car(formData);
        car._id = currentId;
        car.pricePerDay = Number(car.pricePerDay);

        Car.findOneAndUpdate({_id: currentId}, car, {runValidators: true})
            .then(() => {
                req.flash('success', 'Car updated successfully');
                res.redirect('/car/all');
            })
            .catch(err => {
                errorHandler(err, req, res, 'car/edit', formData);
            });
    },
    rentGet: (req, res) => {
        const currentId = req.params.id;

        Car.findById(currentId)
            .then(car => {
                res.render('car/rent', car);
            })
            .catch(err => {
                errorHandler(err, req, res);
            });
    },
    rentPost: (req, res) => {
        const carId = req.params.id;
        const userId = req.user._id;
        const days = Number(req.body.days);
        const expires = new Date(new Date(Date.now()).getTime() + (days * msInOneDay));

        Rent.create({days, car: carId, user: userId, expires})
            .then((rent) => {
                Car.findByIdAndUpdate(carId, {isRented: true, rent: rent._id})
                    .then(() => {
                        req.flash('success', 'Car successfully rented');
                        res.redirect('/user/rents');
                    });
            })
            .catch(err => {
                errorHandler(err, req, res, `/car/rent/${carId}`);
            });
    },
    extendGet: (req, res) => {
        const currentId = req.params.id;

        Car.findById(currentId)
            .populate('rent')
            .then(car => {
                res.render('car/extend', car);
            })
            .catch(err => {
                errorHandler(err, req, res);
            });
    },
    extendPost: (req, res) => {
        const carId = req.params.id;
        const daysToExtend = Number(req.body.days);
        let days;
        let expires;

        Car.findById(carId)
            .populate('rent')
            .then((car) => {
                days = car.rent.days + daysToExtend;
                expires = new Date(new Date(car.rent.expires).getTime() + (daysToExtend * msInOneDay));

                Rent.findByIdAndUpdate(car.rent._id, {days, expires})
                    .then(() => {
                        req.flash('success', 'Rent extended successfully');
                        res.redirect('/user/rents');
                    });
            })
            .catch(err => {
                errorHandler(err, req, res, `/car/extend/${carId}`);
            });
    },
    search: (req, res) => {
        const searchCriteria = req.query;
        let query = {};

        if (Object.keys(searchCriteria).includes('model')) {
            if (searchCriteria.model === '') {
                query = {isRented: false};
            } else {
                query = {model: {$regex: searchCriteria.model, $options: 'i'}, isRented: false};
            }
        } else if (Object.keys(searchCriteria).includes('from')
            && Object.keys(searchCriteria).includes('to')) {
            const fromPrice = searchCriteria.from === '' ? 0 : Number(searchCriteria.from);
            const toPrice = Number(searchCriteria.to);

            query = {pricePerDay: {$gte: fromPrice, $lte: toPrice}, isRented: false};

            if (toPrice === 0) {
                delete query.pricePerDay.$lte;
            }
        }

        Car.find(query)
            .sort('pricePerDay')
            .then(cars => {
                if (cars.length === 0) {
                    req.flash('errors', 'No matches found!');
                }
                res.locals.script = '/assets/searchForms.js';
                res.render('car/all', {cars});
            })
            .catch(err => {
                errorHandler(err, req, res, 'car/all');
            });
    }
};