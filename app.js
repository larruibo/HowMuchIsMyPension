// Packages and modules 
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const hbs = require("hbs");

// Routers
var indexRouter = require("./routes/index");
var dashboardRouter = require("./routes/dashboard");

var app = express();

// Define paths for Express
const publicPath = path.join(__dirname, "public");
const viewsPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

// Setup HBS engine and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicPath));

// Ruta de index
app.use("/", indexRouter);
// Ruta de dashboard
app.use("/dashboard", dashboardRouter);

module.exports = app;
