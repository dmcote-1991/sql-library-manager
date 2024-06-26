var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// 404 Error Handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  err.message = "Sorry! We couldn't find the page you were looking for.";
  next(err);
});

// Global Error Handler
app.use(function (err, req, res, next) {
  // Set default error status and message if not defined
  err.status = err.status || 500;
  err.message =
    err.message || "Sorry! There was an unexpected error on the server.";

  // Log error status and message
  console.error(`Error ${err.status}: ${err.message}`);

  // Render error page
  res.status(err.status);
  res.render("error", { err: err });
});

module.exports = app;
