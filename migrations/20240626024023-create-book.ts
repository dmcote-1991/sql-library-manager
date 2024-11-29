import { QueryInterface, DataTypes } from "sequelize";

export default {
  // Method to run the migration (create table)
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable("Books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      author: {
        type: DataTypes.STRING,
      },
      genre: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    });
  },
  // Method to revert the migration (drop table)
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable("Books");
  },
};
