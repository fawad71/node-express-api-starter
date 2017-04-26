var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

// here insert your mongo cred/connection-string
mongoose.connect('mongodb://127.0.0.1/nodejs-api', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to mongodb');
    }
});

var userController = require('./userController');

router.use('/user', userController);

module.exports = router;