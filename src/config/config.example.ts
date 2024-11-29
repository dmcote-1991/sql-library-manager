import { Dialect } from "sequelize";

// Interface to define the configuration structure
interface Config {
  dialect: Dialect;        // Database dialect, e.g., "sqlite", "postgres"
  storage: string;         // Path to SQLite database file (for SQLite)
  username?: string;       // Database username (for other databases)
  password?: string;       // Database password (for other databases)
  database?: string;       // Database name (for other databases)
  host?: string;           // Database host (for other databases)
  port?: number;           // Database port (for other databases)
}

// Example configuration for different environments
const development: Config = {
  dialect: "sqlite",                   // Use SQLite in development
  storage: "path/to/development.db",   // Replace with your SQLite file path
};

const test: Config = {
  dialect: "sqlite",            // Use SQLite in testing
  storage: "path/to/test.db",   // Replace with your SQLite file path
};

const production: Config = {
  dialect: "sqlite",                  // Use SQLite or another database in production
  storage: "path/to/production.db",   // Replace wiht your SQLite file path
  // Uncomment and use these fields for non-SQLite databases:
  // username: "your-username",
  // password: "your-password",
  // database: "your-database-name",
  // host: "your-database-host",
  // port: 5432, // Example port for PostgreSQL
};

// Export the configuration as an object keyed by environment
const config: { [env: string]: Config } = {
  development,
  test,
  production,
};

export default config;
