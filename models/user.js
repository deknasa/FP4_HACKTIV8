'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.photo, {
        as: "photos",
        foreignKey: "user_id",
      }),
      this.hasMany(models.comment, {
          as: "comments",
          foreignKey: "user_id",
      }),
      this.hasMany(models.socialmedia, {
          as: "socialmedias",
          foreignKey: "user_id",
      });
    }
  }
  user.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_image_url: DataTypes.TEXT,
    age: DataTypes.INTEGER,
    phone_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};