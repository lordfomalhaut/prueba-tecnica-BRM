'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PurchaseDetail extends Model {
    static associate(models) {
      PurchaseDetail.belongsTo(models.Purchase, { foreignKey: 'purchaseId' });
      PurchaseDetail.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }

  PurchaseDetail.init(
    {
      purchaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'purchaseId'
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'productId'
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'PurchaseDetail',
      tableName: 'PurchaseDetails',
      underscored: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return PurchaseDetail;
};
