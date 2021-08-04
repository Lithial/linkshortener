const express = require('express');
const cors = require('cors');
const routes = require('../routes');

module.exports = async function expressSettings ( app ) {
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
    app.use(cors({
        "Access-Control-Allow-Origin" : '*',
        "Access-Control-Allow-Methods": 'GET, PUT, POST, DELETE, OPTIONS',
        "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }));

    // Load API routes
    routes(app)

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        //res.send({
        //    message:"Error. Shits broke yo",
        //    status: 404
        //})
        const err = new Error(req, ' Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status)
                .send({ message: err.message })
                .end();
        }
        return next(err);
    });
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};