import path from "path";
import { Sequelize } from "sequelize";
import config from "../config/config.js";
import BookModel from './book.js'

// Simulate __filename and __dirname in ES module scope
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
  }
);

// Authenticate the database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Unable to connect to the database:", err));

const Book = BookModel(sequelize);

export { sequelize, Book };
export default sequelize;
