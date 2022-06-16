'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class photo extends Model {
    
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
    title: {
      type: DataTypes.STRING,
      validate: {
          notEmpty: {
              args: true,
              msg: "title is required",
          },
      }
  },
  caption: {
      type: DataTypes.TEXT,
      validate: {
          notEmpty: {
              args: true,
              msg: "caption is required",
          },
      }
  },
  poster_image_url: {
      type: DataTypes.TEXT,
      validate: {
          notEmpty: {
              args: true,
              msg: "pasposter_image_urlsword is required",
          },
          isUrl: {
              args: true,
              msg: "poster_image_url muet be url",
          }
      }
  },
  user_id: {
      type: DataTypes.INTEGER,
      validate: {

      }
  },
  }, {
    sequelize,
    modelName: 'photo',
  });
  return photo;
};