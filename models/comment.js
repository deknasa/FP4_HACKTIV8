'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        as: "user",
        foreignKey: "user_id",
      });
    this.belongsTo(models.photo, {
        as: "photos",
        foreignKey: "photo_id",
      });
    }
  }
  comment.init({
    user_id: DataTypes.INTEGER,
    photo_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};