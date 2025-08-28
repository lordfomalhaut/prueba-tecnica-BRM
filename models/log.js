'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    static associate(models) {
      Log.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Log.init({
    action: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Log',
    tableName: 'Logs',
    underscored: false,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });
  return Log;
};
