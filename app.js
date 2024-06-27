// Imports modules
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./models");
const { Op } = require("sequelize");

// Imports routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// Initializes the Express application
const app = express();

// View engine setup (using Pug)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes setup
app.use("/", indexRouter);
app.use("/users", usersRouter);

// 404 Error Handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  err.message = "Sorry! We couldn't find the page you were looking for.";
  next(err);
});

// Global Error Handler
app.use(function (err, req, res, next) {
  err.status = err.status || 500;
  err.message =
    err.message || "Sorry! There was an unexpected error on the server.";
  console.error(`Error ${err.status}: ${err.message}`);
  res.status(err.status);
  if (err.status === 404) {
    res.render("page-not-found");
  } else {
    res.render("error", { err });
  }
});

// Exports the Express application
module.exports = app;
