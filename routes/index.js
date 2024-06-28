// Imports modules
const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");

// Default route to redirect to "/books"
router.get("/", (req, res) => {
  res.redirect("/books");
});

// Route to display list of books
router.get("/books", async (req, res, next) => {
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
router.get("/books/new", (req, res) => {
  res.render("new-book");
});

// Route to handle submission of new book form
router.post("/books/new", async (req, res, next) => {
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
router.get("/books/:id", async (req, res, next) => {
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
router.post("/books/:id", async (req, res, next) => {
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
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      res.render("form-error-update", {
        title: "Update Book",
        errors,
        book: {
          id: req.params.id,
          title: req.body.title,
          author: req.body.author,
          genre: req.body.genre,
          year: req.body.year,
        },
      });
    } else {
      next(error);
    }
  }
});

// Route to handle deletion of a book
router.post("/books/:id/delete", async (req, res, next) => {
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

module.exports = router;
