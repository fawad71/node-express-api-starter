var express = require('express'),
    router = express.Router(),
    crypto = require('crypto'),
    userModel = require('../models/userModel');

hash = function (password) {
    return crypto.createHash('sha1').update(password).digest('base64')
};

router.use(function (req, res, next) {
    /*
     * works as middleware
     * logging will go here
     * set headers to allow CORS -> not recommended
     * */
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('comes in user controller');

    if (req.header('Content-Type') != 'application/json') {
        res.status(400).send('Bad Request');
    }
    next();
});

router.post('/create', function (req, res) {
    var body = req.body;
    var userData = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        password: hash(body.password)
    };
    userModel.create(userData, function (err) {
        var success, message, status;
        if (err) {
            success = false;
            message = 'something went wrong';
            status = 500;
        } else {
            success = true;
            message = 'you have successfully signed up';
            status = 201;
        }
        res.status(status).json({
            success: success,
            message: message
        });
    });
});

router.post('/login', function (req, res) {

    var body = req.body;

    var userFindData = {
        email: body.email,
        password: hash(body.password)
    };

    userModel.login(userFindData, function (err, docs) {
        if(err) throw err;

        res.status(202).json({
            success: true,
            message: 'you have successfully logged in',
            data: docs
        });
    });
});

module.exports = router;

