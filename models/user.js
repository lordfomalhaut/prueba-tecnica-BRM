'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        as: 'Role',
        foreignKey: { name: 'roleId', field: 'roleId' }
      });
      User.hasMany(models.Purchase, { foreignKey: 'userId' });
      User.hasMany(models.Log, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'roleId'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: false,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return User;
};
