/**
 * @file app.ts
 * @description Entry point for the Express application. Sets up middleware, routes, and error handling.
 */

import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

// Import routes
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

// Initialize Express application
const app = express();

/**
 * Set up the view engine.
 * Configures Pug as the templating engine and sets the directory for views.
 */
app.set("views", path.join(path.resolve(), "views"));
app.set("view engine", "pug");

/**
 * Middleware configuration.
 * - `logger`: Logs HTTP requests to the console.
 * - `express.json()`: Parses incoming JSON payloads.
 * - `express.urlencoded`: Parses URL-encoded payloads.
 * - `cookieParser`: Parses cookies attached to client requests.
 * - `express.static`: Serves static files from the "public" directory.
 */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));

/**
 * Define application routes.
 * - `/`: Routes for the main index.
 * - `/users`: Routes for user-related operations.
 */
app.use("/", indexRouter);
app.use("/users", usersRouter);

/**
 * 404 Error Handler.
 * Captures requests to undefined routes and forwards them to the global error handler.
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error("Not Found");
  (err as any).status = 404;
  next(err);
});

/**
 * Global Error Handler.
 * Handles all application errors and provides appropriate responses:
 * - Renders a "page-not-found" view for 404 errors.
 * - Renders a generic "error" view for other errors.
 */
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

// Export the configured Express application instance
export default app;
