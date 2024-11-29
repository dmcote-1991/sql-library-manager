import { Sequelize, Model, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  class Book extends Model {}
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: '"Title" is required' } },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: '"Author" is required' } },
      },
      genre: { type: DataTypes.STRING },
      year: { type: DataTypes.INTEGER, validate: { isInt: true } },
    },
    { sequelize, modelName: "Book" }
  );
  return Book;
};
