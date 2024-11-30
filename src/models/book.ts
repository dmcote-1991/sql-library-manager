/**
 * @file book.ts
 * @description Defines the Book model, representing a single book entity in the database. Includes schema definitions, data validation, and model initialization.
 */

import { Sequelize, Model, DataTypes } from "sequelize";

/**
 * Defines and initializes the Book model.
 * 
 * @param {Sequelize} sequelize - The Sequelize instance used to initialize the model.
 * @returns {Model} The initialized Book model.
 */
export default (sequelize: Sequelize) => {
  /**
   * @class Book
   * @extends Model
   * Represents a book entity in the database, including attributes such as title, author, genre, and year.
   */
  class Book extends Model {}

  Book.init(
    {
      /**
       * @property {string} title - The title of the book. This field is required and cannot be empty.
       */
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { 
          notEmpty: { msg: '"Title" is required' } // Custom error message for empty values
        },
      },
      /**
       * @property {string} author - The author of the book. This field is required and cannot be empty.
       */
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { 
          notEmpty: { msg: '"Author" is required' } // Custom error message for empty values
        },
      },
      /**
       * @property {string} genre - The genre of the book. This field is optional.
       */
      genre: { 
        type: DataTypes.STRING 
      },
      /**
       * @property {number} year - The publication year of the book. This field must be an integer if provided.
       */
      year: { 
        type: DataTypes.INTEGER, 
        validate: { 
          isInt: { msg: '"Year" must be an integer' }, // Ensures the value is an integer
        },
      },
    },
    { 
      sequelize, // The Sequelize instance
      modelName: "Book", // The name of the model
    }
  );
  
  return Book;
};
