const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require('./user.model');
const TradeOrder = require('./tradeOrder.model');

const Transaction = sequelize.define("Transaction", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tradeOrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: TradeOrder, key: "id" },
  },
  buyerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  amount: { type: DataTypes.DECIMAL(18, 8), allowNull: false },
  price: { type: DataTypes.DECIMAL(18, 8), allowNull: false },
});

module.exports = Transaction;
