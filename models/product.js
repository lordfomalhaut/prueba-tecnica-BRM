'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.PurchaseDetail, { foreignKey: 'productId' });
    }
  }
  Product.init({
    batchNumber: { type: DataTypes.STRING, field: 'batchNumber', allowNull: false },
    name:       { type: DataTypes.STRING, allowNull: false },
    price:      { type: DataTypes.DECIMAL(10,2), allowNull: false },
    stock:      { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    dateEntry:  { type: DataTypes.DATE, field: 'dateEntry' }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    underscored: true,
    timestamps: true
  });
  return Product;
};
