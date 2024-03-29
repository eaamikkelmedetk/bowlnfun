var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var admin = require('./routes/admin');
var center = require('./routes/center');
var terminal = require('./routes/terminal');
var login = require('./routes/login');

var app = express();

/*--------------------------------------------------*/
/*                 Configuration                    */
/*--------------------------------------------------*/
mongoose.connect(config.database);
app.set('superSecret', config.secret);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Open routers(s)
app.use(login);


// Locked router(s)
app.use('/terminal', terminal);
app.use('/center', center);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Siden blev ikke fundet');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
