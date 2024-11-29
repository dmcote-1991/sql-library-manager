import { Router, Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import { Book } from "../models/index.js";

const router = Router();

// Default route to redirect to "/books"
router.get("/", (req: Request, res: Response) => {
  res.redirect("/books");
});

// Route to display list of books
router.get("/books", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const whereClause: any = {};
    if (search) {
      const query = (search as string).toLowerCase();
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${query}%` } },
        { author: { [Op.like]: `%${query}%` } },
        { genre: { [Op.like]: `%${query}%` } },
        { year: { [Op.like]: `%${query}%` } },
      ];
    }

    const { count, rows: books } = await Book.findAndCountAll({
      where: whereClause,
      offset,
      limit: Number(limit),
    });

    res.render("index", {
      title: "Books",
      books,
      searchQuery: search,
      pagination: { page: Number(page), pageCount: Math.ceil(count / Number(limit)) },
    });
  } catch (error) {
    next(error);
  }
});

// Other routes
router.get("/books/new", (req: Request, res: Response) => res.render("new-book"));

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

router.get("/books/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) throw new Error("Book not found");
    res.render("update-book", { book });
  } catch (error) {
    next(error);
  }
});

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

export default router;
