// Import the Express module and necessary types
import express, { Request, Response, NextFunction, Router } from "express";

// Create a router object using express.Router()
const router: Router = express.Router();

// Define a route for handling GET requests to the root path ("/")
// This route sends a basic text response.
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("respond with a resource");
});

// Export the router object so it can be used by other parts of the application.
export default router;
