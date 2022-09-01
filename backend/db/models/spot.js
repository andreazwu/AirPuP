'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User, {
        foreignKey: "ownerId",
        as: "Owner"
      })

      Spot.hasMany(
        models.SpotImage, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        hooks: true
      })

      Spot.hasMany(
        models.Booking, {
        foreignKey: "spotId"
      })

      Spot.hasMany(
        models.Review, {
        foreignKey: "spotId"
      })

      // Spot.belongsToMany(
      //   models.User, {
      //   through: models.Booking,
      //   foreignKey: "spotId",
      //   otherKey: "userId"
      // })

      // Spot.belongsToMany(
      //   models.User, {
      //   through: models.Review,
      //   foreignKey: "spotId",
      //   otherKey: "userId"
      // })

    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    lat: {
      type: DataTypes.DECIMAL(8, 6),
      allowNull: false,
      validate: {
        min: -90,
        max: 90
      }
    },
    lng: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
      validate: {
        min: -180,
        max: 180
      }
    },
    name: {
      type: DataTypes.STRING(49),
      allowNull: false,
      validate: {
        len: [1, 49]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
