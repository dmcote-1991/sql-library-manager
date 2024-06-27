var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const db = require("./models");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Routes
app.get("/", (req, res) => {
  res.redirect("/books");
});

app.get("/books", async (req, res, next) => {
  try {
    const books = await db.Book.findAll();
    res.render("index", { title: "Books", books });
  } catch (error) {
    next(error);
  }
});

app.get("/books/new", (req, res) => {
  res.render("new-book", { title: "New Book" });
});

app.post("/books/new", async (req, res, next) => {
  try {
    const { title, author, genre, year } = req.body;
    await db.Book.create({ title, author, genre, year });
    res.redirect("/books");
  } catch (error) {
    next(error);
  }
});

app.get("/books/:id", async (req, res, next) => {
  try {
    const book = await db.Book.findByPk(req.params.id);
    if (!book) {
      const error = new Error("Book not found");
      error.status = 404;
      throw error;
    }
    res.render("update-book", { title: "Update Book", book });
  } catch (error) {
    next(error);
  }
});

app.post("/books/:id", async (req, res, next) => {
  try {
    const { title, author, genre, year } = req.body;
    const book = await db.Book.findByPk(req.params.id);
    if (!book) {
      const error = new Error("Book not found");
      error.status = 404;
      throw error;
    }
    await book.update({ title, author, genre, year });
    res.redirect("/books");
  } catch (error) {
    next(error);
  }
});

app.post("/books/:id/delete", async (req, res, next) => {
  try {
    const book = await db.Book.findByPk(req.params.id);
    if (!book) {
      const error = new Error("Book not found");
      error.status = 404;
      throw error;
    }
    await book.destroy();
    res.redirect("/books");
  } catch (error) {
    next(error);
  }
});

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
