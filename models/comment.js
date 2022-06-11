'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    
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
    user_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "photo_id is required",
        },
      }
    },
    photo_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "photo_id is required",
        },
      }
    },
    comment: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "comment is required",
        },
      }
    },
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};