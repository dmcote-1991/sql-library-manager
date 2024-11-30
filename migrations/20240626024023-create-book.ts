import { QueryInterface, DataTypes } from "sequelize";

export default {
  /**
   * Method to run the migration.
   * Creates the "Books" table with the specified columns and constraints.
   *
   * @param {QueryInterface} queryInterface - Sequelize's interface for database operations.
   * @returns {Promise<void>}
   */
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable("Books", {
      /**
       * Primary Key: `id`
       * - Auto-incremented integer.
       * - Cannot be null.
       * - Serves as the unique identifier for each book.
       */
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      /**
       * `title`
       * - String field for the book's title.
       */
      title: {
        type: DataTypes.STRING,
      },
      /**
       * `author`
       * - String field for the book's author.
       */
      author: {
        type: DataTypes.STRING,
      },
      /**
       * `genre`
       * - String field for the book's genre.
       */
      genre: {
        type: DataTypes.STRING,
      },
      /**
       * `year`
       * - Integer field for the book's publication year.
       */
      year: {
        type: DataTypes.INTEGER,
      },
      /**
       * `createdAt`
       * - Timestamp for when the record was created.
       * - Automatically assigned a default value.
       * - Cannot be null.
       */
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      /**
       * `updatedAt`
       * - Timestamp for when the record was last updated.
       * - Automatically assigned a default value.
       * - Cannot be null.
       */
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    });
  },

  /**
   * Method to revert the migration.
   * Drops the "Books" table if it exists.
   *
   * @param {QueryInterface} queryInterface - Sequelize's interface for database operations.
   * @returns {Promise<void>}
   */
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable("Books");
  },
};
