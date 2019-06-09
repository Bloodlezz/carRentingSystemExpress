const homeRouter = require('../routes/homeRouter');
const userRouter = require('../routes/userRouter');
const carRouter = require('../routes/carRouter');
const invalidRouter = require('../routes/invalidRouter');

module.exports = (app) => {
    app.use('/', homeRouter);
    app.use('/user', userRouter);
    app.use('/car', carRouter);
    app.use('*', invalidRouter);
};