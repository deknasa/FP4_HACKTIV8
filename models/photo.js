'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.comment, {
        as: "comments",
        foreignKey: "photo_id",
      });
      this.belongsTo(models.user, {
        as: "user",
        foreignKey: "user_id",
      });
    }
  }
  photo.init({
    title: DataTypes.STRING,
    caption: DataTypes.TEXT,
    poster_image_url: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'photo',
  });
  return photo;
};