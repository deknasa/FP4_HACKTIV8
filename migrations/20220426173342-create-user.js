'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
          allowNull: false,
          unique: true,
        },
      },
      username: {
        type: Sequelize.STRING,
        validate: {
          allowNull: false,
          unique: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          allowNull: false,
        },
      },
      profile_image_url: {
        type: Sequelize.TEXT,
        validate: {
          allowNull: false,
          isUrl: true,
        },
      },
      age: {
        type: Sequelize.INTEGER,
        validate: {
          allowNull: false,
          isInt: true,
        },
      },
      phone_number: {
        type: Sequelize.INTEGER,
        validate: {
          allowNull: false,
          isInt: true,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};