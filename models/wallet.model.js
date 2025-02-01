const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require('./user.model');
const Currency = require('./currency.model');

const Wallet = sequelize.define("Wallet", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  currencyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Currency, key: "id" },
  },
  balance: { type: DataTypes.DECIMAL(18, 8), defaultValue: 0.0 },
});

module.exports = Wallet;
