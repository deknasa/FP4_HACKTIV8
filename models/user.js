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
    full_name: {
      type: DataTypes.STRING,
        validate: {
          notEmpty: {
          args: true,
          msg: "full_name is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email address already in use. Try another one!",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required",
        },
        isEmail: {
          args: true,
          msg: "email must be valid",
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "username is required",
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "password is required",
        },
      }
    },
    profile_image_url: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "password is required",
        },
        isUrl: {
          args: true,
          msg: "profile_image_url muet be url",
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "age is required",
        },
        isInt: {
          args: true,
          msg: "balance must be integer",
        },
      }
    },
    phone_number: {
      type: DataTypes.NUMBER,
      validate: {
        notEmpty: {
          args: true,
          msg: "phone_number is required",
        },
        isInt: {
          args: true,
          msg: "phone_number must be integer",
        },
      }
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};