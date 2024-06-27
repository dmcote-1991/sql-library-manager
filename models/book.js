"use strict";

// Module imports
const { Model, DataTypes } = require("sequelize");

// Exports a function that defines and returns the Book model
module.exports = (sequelize) => {
  class Book extends Model {}

  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: '"Title" is required',
          },
        },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: '"Author" is required',
          },
        },
      },
      genre: DataTypes.STRING,
      year: DataTypes.INTEGER,
    },
    {
      sequelize, // Passes the sequelize instance to the model
      modelName: "Book", // Defines the model name as "Book"
    }
  );
  return Book;
};
