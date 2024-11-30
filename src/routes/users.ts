/**
 * @file users.ts
 * @description Defines routes for user-related operations.
 * This module sets up and exports a router for handling requests to the `/users` endpoint.
 */

import express, { Request, Response, NextFunction, Router } from "express";

// Create a new Router instance to define user-related routes
const router: Router = express.Router();

/**
 * Route: GET /users
 * @description Handles GET requests to the `/users` endpoint.
 * Sends a plain text response.
 * 
 * @param {Request} req - The incoming HTTP request object.
 * @param {Response} res - The HTTP response object to send data back to the client.
 * @param {NextFunction} next - Callback to pass control to the next middleware or route.
 */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("respond with a resource");
});

// Export the configured router to be used in the main application
export default router;
