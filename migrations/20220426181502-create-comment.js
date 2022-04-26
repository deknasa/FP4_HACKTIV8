'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },  
      photo_id: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT,
        validate: {
          allowNull: false,
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
    })
    .then(() =>
      queryInterface.addConstraint("comments", {
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
    )
    .then(() =>
      queryInterface.addConstraint("comments", {
        fields: ["photo_id"],
        type: "foreign key",
        name: "photo_fk",
        references: {
            table: "photos",
            field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      })
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};