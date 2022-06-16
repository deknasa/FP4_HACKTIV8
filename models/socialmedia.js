'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class socialmedia extends Model {
   
    static associate(models) {
      this.belongsTo(models.user, {
        as: "user",
        foreignKey: "user_id",
      });
    }
  }
  socialmedia.init({
    name: {
      type: DataTypes.STRING,
      validate: {
          notEmpty: {
              args: true,
              msg: "name is required",
          },
      }
  },
  user_id: {
      type: DataTypes.INTEGER,
      validate: {
          notEmpty: {
              args: true,
              msg: "user_id is required",
          },
          isInt: {
              args: true,
              msg: "user_id must be integer",
          },
      }
  },
  social_media_url: {
      type: DataTypes.TEXT,
      validate: {
          notEmpty: {
              args: true,
              msg: "social_media_url is required",
          },
          isUrl: {
              args: true,
              msg: "profile_image_url muet be url",
          }
      }
  },
  }, {
    sequelize,
    modelName: 'socialmedia',
  });
  return socialmedia;
};