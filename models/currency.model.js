const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Currency = sequelize.define("Currency", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  symbol: { type: DataTypes.STRING, unique: true, allowNull: false },
  type: { type: DataTypes.ENUM("crypto", "fiat"), allowNull: false },
});

module.exports = Currency;
