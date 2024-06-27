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

/**
 * Routes
 */
// Default route to redirect to "/books"
app.get("/", (req, res) => {
  res.redirect("/books");
});

// Route to display list of books
app.get("/books", async (req, res, next) => {
  try {
    let whereClause = {};
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10; // Number of items per page

    if (req.query.search) {
      const searchQuery = req.query.search.toLowerCase();
      whereClause = {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
          {
            author: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
          {
            genre: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
          {
            year: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
        ],
      };
    }

    const { count, rows: books } = await db.Book.findAndCountAll({
      where: whereClause,
      offset: (page - 1) * limit,
      limit: limit,
    });

    res.render("index", {
      title: "Books",
      books,
      searchQuery: req.query.search,
      pagination: { page, pageCount: Math.ceil(count / limit) },
    });
  } catch (error) {
    next(error);
  }
});

// Route to render form for adding a new book
app.get("/books/new", (req, res) => {
  res.render("new-book");
});

// Route to handle submission of new book form
app.post("/books/new", async (req, res, next) => {
  try {
    const { title, author, genre, year } = req.body;
    await db.Book.create({ title, author, genre, year });
    res.redirect("/books");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      res.render("form-error", {
        title: "New Book",
        errors,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year,
      });
    } else {
      next(error);
    }
  }
});

// Route to render book details for update
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

// Route to handle submission of updated book details
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

// Route to handle deletion of a book
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

// Exports the Express application
module.exports = app;
