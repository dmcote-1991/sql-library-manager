/**
 * @file config.example.ts
 * @description Provides database configuration settings for different environments (development, testing, production). 
 * This file serves as a template for actual configuration (`config.ts`) and should be customized for specific project requirements.
 */

import { Dialect } from "sequelize";

/**
 * @interface Config
 * @description Defines the structure for database configuration settings.
 * 
 * @property {Dialect} dialect - The database dialect (e.g., "sqlite", "postgres").
 * @property {string} storage - Path to the SQLite database file (applicable for SQLite).
 * @property {string} [username] - Database username (for non-SQLite databases).
 * @property {string} [password] - Database password (for non-SQLite databases).
 * @property {string} [database] - Database name (for non-SQLite databases).
 * @property {string} [host] - Database host (for non-SQLite databases).
 * @property {number} [port] - Database port (for non-SQLite databases).
 */
interface Config {
  dialect: Dialect;
  storage: string;
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number;
}

/**
 * Configuration for the development environment.
 * Uses SQLite for simplicity and local development.
 */
const development: Config = {
  dialect: "sqlite",                   // Database dialect
  storage: "path/to/development.db",   // Path to the SQLite database file
};

/**
 * Configuration for the test environment.
 * Uses SQLite to simplify automated testing without external dependencies.
 */
const test: Config = {
  dialect: "sqlite",            // Database dialect
  storage: "path/to/test.db",   // Path to the SQLite database file
};

/**
 * Configuration for the production environment.
 * Defaults to SQLite but can be customized for other databases like PostgreSQL.
 * Uncomment the relevant fields for production use with a non-SQLite database.
 */
const production: Config = {
  dialect: "sqlite",                  // Database dialect
  storage: "path/to/production.db",   // Path to the SQLite database file
  // Uncomment and customize the following fields for other database configurations:
  // username: "your-username",
  // password: "your-password",
  // database: "your-database-name",
  // host: "your-database-host",
  // port: 5432, // Example port for PostgreSQL
};

/**
 * Aggregated configuration object, keyed by environment.
 * Ensures that each environment is mapped to its corresponding configuration.
 */const config: { [env: string]: Config } = {
  development,
  test,
  production,
};

// Export the configuration object for use in the application
export default config;
