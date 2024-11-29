// Imports modules
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

// Import routes
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

// Initialize Express application
const app = express();

// View engine setup
app.set("views", path.join(path.resolve(), "views"));
app.set("view engine", "pug");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// 404 Error Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error("Not Found");
  (err as any).status = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 500;
  console.error(`Error ${err.status}: ${err.message}`);
  res.status(err.status);
  if (err.status === 404) {
    res.render("page-not-found");
  } else {
    res.render("error", { err });
  }
});

export default app;
