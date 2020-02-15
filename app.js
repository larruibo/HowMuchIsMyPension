var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const testRouter = require('./routes/test');

var app = express();

// Define paths for Express
const publicPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, '/templates/partials');
const partialsPath = path.join(__dirname, '/templates/views');

// Setup HBS engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicPath));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
// Route para pruebas con node
app.use('/test', testRouter);

module.exports = app;
