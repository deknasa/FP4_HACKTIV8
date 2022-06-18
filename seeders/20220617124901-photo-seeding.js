'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("photos", [{
            "title": "La Liga Satender",
            "caption": "we are the champion",
            "poster_image_url": "https://www.npmjs.com/package/sequelize-cli",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }], {})
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};