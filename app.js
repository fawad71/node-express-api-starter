var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./app/controllers'));

// start server
app.listen(port, function () {
    console.log('chal para');
});