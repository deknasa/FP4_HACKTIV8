'use strict';

module.exports = {
  async up (queryInterface, req, Sequelize) {
    const user_id = req.id
    queryInterface.bulkInsert("photos", [{
      "title": "tanjiro",
      "caption": "tanjiro",
      "profile_image_url": "https://www.github.com",
      "createdAt": new Date(),
      "updatedAt": new Date()
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
