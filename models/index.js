"use strict";

// Module imports
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

/**
 * Asynchronous function that initializes Sequelize ORM with database configuration,
 * establishes a connection, synchronizes all defined models, and dynamically
 * imports and associates each model from the current directory, exporting the
 * Sequelize instance and all models for use throughout the application.
 */
(async () => {
  let sequelize;

  // Creates Sequelize instance based on configuration
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  }

  try {
    // Tests the database connection
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    // Synchronizes all defined models with the database
    await sequelize.sync();
    console.log("All models have been synchronized with the database.");

    // Reads all files in the current directory (excluding test files)
    fs.readdirSync(__dirname)
      .filter((file) => {
        return (
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js" &&
          file.indexOf(".test.js") === -1
        );
      })
      // Imports each model definition file
      .forEach((file) => {
        const model = require(path.join(__dirname, file))(
          sequelize,
          Sequelize.DataTypes
        );
        db[model.name] = model; // Adds each model to the db object
      });

    // Associates each model if defined
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    // Attaches sequelize and Sequelize instances to the db object
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
})();

module.exports = db;
