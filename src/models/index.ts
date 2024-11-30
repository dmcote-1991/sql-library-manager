/**
 * @file index.ts
 * @description This file initializes the Sequelize ORM, sets up the database connection, and exports the database instance and models for use throughout the application.
 */

import path from "path";
import { Sequelize } from "sequelize";
import config from "../config/config.js";
import BookModel from './book.js'

// Simulate __filename and __dirname in ES module scope
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Determine the current environment (default to "development") and load the corresponding configuration
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

/**
 * Initialize the Sequelize instance with the configuration for the current environment.
 */
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect, // Specifies the database dialect (SQLite)
    storage: dbConfig.storage, // Path to SQLite database file
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected")) // Log success message on successful connection
  .catch((err) => 
    console.error("Unable to connect to the database:", err)); // Log error message if connection fails

/**
 * Initialize models and associate them with the Sequelize instance.
 * 
 * @type {import("./book").BookStatic} - Represents the Book model.
 */
const Book = BookModel(sequelize);

// Export the Sequelize instance and models for use in other parts of the application
export { sequelize, Book };
export default sequelize;
