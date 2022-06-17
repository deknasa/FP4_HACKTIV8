'use strict';
const { hashedPassword } = require('../helpers/bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert("users", [{
      full_name: "tanjiro",
      email: "tanjiro@gmail.com",
      username: "tanjiro",
      password: `${hashedPassword("tanjiro")}`,      
      profile_image_url: "https://www.github.com",
      age: 17,
      phone_number: 987654321,
      createdAt: new Date(),
      updatedAt: new Date()
  }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
