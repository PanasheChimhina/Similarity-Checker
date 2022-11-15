'use strict';

var express = require('express');
var bodyParser = require('body-parser');
let helmet = require('helmet')
var app = express();

const apiRoutes = require('./routes/api.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views')

//security
app.use(helmet.frameguard({
    action: 'sameorigin'
}))
app.use(helmet.dnsPrefetchControl({
    allow: false
}))
app.use(helmet.referrerPolicy({
    policy: 'same-origin'
}))

//Routing for API 
apiRoutes(app);

//404 Not Found Middleware
app.use(function (req, res, next) {
    res.status(404)
        .type('text')
        .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3002, function () {
});

// module.exports = app; //for testing