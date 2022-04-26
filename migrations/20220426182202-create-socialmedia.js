'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('socialmedia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        validate: {
          allowNull: false,
        },
      },
      social_media_url: {
        type: Sequelize.STRING,
        validate: {
          allowNull: false,
          isUrl: true,
        },
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() =>
      queryInterface.addConstraint("socialmedia", {
        fields: ["user_id"],
        type: "foreign key",
        name: "user_fk",
        references: {
            table: "users",
            field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      })
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('socialmedia');
  }
};