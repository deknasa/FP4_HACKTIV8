'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [{
                "full_name": "dimas",
                "email": "dimas@gmail.com",
                "username": "dimas",
                "password": "$2a$12$4LiC7MVqH2tT/QCOglSJz.t/ErtNNiCaHetnCxiTmoh2osWj84Bqm", // password : dimas
                "profile_image_url": "https://github.com/",
                "age": 45,
                "phone_number": 3234534,
                "createdAt": new Date(),
                "updatedAt": new Date(),
            },
            {
                "full_name": "damian",
                "email": "damian@gmail.com",
                "username": "damian",
                "password": "$2a$12$Htr1b2RLd1kY4dbt9HoVauPyiJTzL0Atqr/Last/H07y8DAsBm1OO", // password : damian
                "profile_image_url": "https://github.com/",
                "age": 45,
                "phone_number": 3234534,
                "createdAt": new Date(),
                "updatedAt": new Date(),
            }
        ], {});
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