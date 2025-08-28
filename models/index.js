'use strict';

const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { ...config, logging: false }
);

const Role           = require('./role')(sequelize, DataTypes);
const User           = require('./user')(sequelize, DataTypes);
const Product        = require('./product')(sequelize, DataTypes);
const Purchase       = require('./purchase')(sequelize, DataTypes);
const PurchaseDetail = require('./purchasedetail')(sequelize, DataTypes);
const Log            = require('./log')(sequelize, DataTypes);

Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

User.hasMany(Purchase, { foreignKey: 'userId' });
Purchase.belongsTo(User, { foreignKey: 'userId' });

Purchase.hasMany(PurchaseDetail, { foreignKey: 'purchaseId' });
PurchaseDetail.belongsTo(Purchase, { foreignKey: 'purchaseId' });

Product.hasMany(PurchaseDetail, { foreignKey: 'productId' });
PurchaseDetail.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Log, { foreignKey: 'userId' });
Log.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  Sequelize,
  Role,
  User,
  Product,
  Purchase,
  PurchaseDetail,
  Log,
};
