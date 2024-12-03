/**
 * @file index.ts
 * @description Defines routes for managing books, including listing, creating, updating, and deleting records.
 * This module handles routing logic for the `/` and `/books` endpoints.
 */

import { Router, Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import { Book } from "../models/index.js";

const router = Router();

/**
 * Route: GET /
 * @description Redirects the root endpoint `/` to `/books`.
 * 
 * @param {Request} req - The incoming HTTP request object.
 * @param {Response} res - The HTTP response object to send the redirect.
 */
router.get("/", (req: Request, res: Response) => {
  res.redirect("/books");
});

/**
 * Route: GET /books
 * @description Fetches and displays a paginated list of books. Supports an optional search query.
 * 
 * @param {Request} req - The incoming HTTP request object, with optional `page`, `limit`, and `search` query parameters.
 * @param {Response} res - The HTTP response object to render the book list.
 * @param {NextFunction} next - Callback to pass control to the next middleware or error handler.
 */
router.get("/books", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10; // Default to 10 if undefined
    const offset = (Number(page) - 1) * Number(limit);

    // Construct search criteria if a search query is provided
    const whereClause: any = {};
    if (req.query.search) {
      const query = (req.query.search as string).toLowerCase();
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${query}%` } },
        { author: { [Op.like]: `%${query}%` } },
        { genre: { [Op.like]: `%${query}%` } },
        { year: { [Op.like]: `%${query}%` } },
      ];
    }

    // Fetch matching books and count for pagination
    const { count, rows: books } = await Book.findAndCountAll({
      where: whereClause,
      offset,
      limit,
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

/**
 * Route: GET /books/new
 * @description Renders a form to create a new book.
 * 
 * @param {Request} req - The incoming HTTP request object.
 * @param {Response} res - The HTTP response object to render the form.
 */
router.get("/books/new", (req: Request, res: Response) => {
  res.render("new-book")
});

/**
 * Route: POST /books/new
 * @description Handles form submission for creating a new book. Validates input and saves to the database.
 * 
 * @param {Request} req - The incoming HTTP request object with book data in the body.
 * @param {Response} res - The HTTP response object to redirect or re-render the form with errors.
 * @param {NextFunction} next - Callback to pass control to the next middleware or error handler.
 */
router.post("/books/new", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, genre, year } = req.body;
    await Book.create({ title, author, genre, year });
    res.redirect("/books");
  } catch (error) {
    if ((error as any).name === "SequelizeValidationError") {
      const errors = (error as any).errors.map((err: any) => err.message);
      res.render("new-book", { errors, book: req.body });
    } else {
      next(error);
    }
  }
});

/**
 * Route: GET /books/:id
 * @description Displays a form to update the details of a specific book.
 * 
 * @param {Request} req - The incoming HTTP request object, with the book ID in the URL parameters.
 * @param {Response} res - The HTTP response object to render the form.
 * @param {NextFunction} next - Callback to pass control to the next middleware or error handler.
 */
router.get("/books/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) throw new Error("Book not found");
    res.render("update-book", { book });
  } catch (error) {
    next(error);
  }
});

/**
 * Route: POST /books/:id
 * @description Handles form submission for updating a specific book's details.
 * 
 * @param {Request} req - The incoming HTTP request object with updated book data in the body.
 * @param {Response} res - The HTTP response object to redirect to the book list.
 * @param {NextFunction} next - Callback to pass control to the next middleware or error handler.
 */
router.post("/books/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) throw new Error("Book not found");
    await book.update(req.body);
    res.redirect("/books");
  } catch (error) {
    next(error);
  }
});

/**
 * Route: POST /books/:id/delete
 * @description Deletes a specific book from the database.
 * 
 * @param {Request} req - The incoming HTTP request object, with the book ID in the URL parameters.
 * @param {Response} res - The HTTP response object to redirect to the book list.
 * @param {NextFunction} next - Callback to pass control to the next middleware or error handler.
 */
router.post("/books/:id/delete", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) throw new Error("Book not found");
    await book.destroy();
    res.redirect("/books");
  } catch (error) {
    next(error);
  }
});

// Export the router to be used in the main application
export default router;
