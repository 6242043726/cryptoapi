const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require('./user.model');
const Currency = require('./currency.model');

const TradeOrder = sequelize.define("TradeOrder", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  fromCurrencyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Currency, key: "id" },
  },
  toCurrencyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Currency, key: "id" },
  },
  amount: { type: DataTypes.DECIMAL(18, 8), allowNull: false },
  price: { type: DataTypes.DECIMAL(18, 8), allowNull: false },
  status: {
    type: DataTypes.ENUM("open", "completed", "canceled"),
    defaultValue: "open",
  },
});

module.exports = TradeOrder;
