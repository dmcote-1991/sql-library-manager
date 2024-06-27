// Require the express module, which is used to create the web server.
var express = require("express");

// Create a router object using express.Router().
var router = express.Router();

// Define a route for handling GET requests to the root path ("/").
// This route sends a basic text response.
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Export the router object so it can be used by other parts of the application.
module.exports = router;
