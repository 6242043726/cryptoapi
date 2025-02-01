const User = require('./user.model');
const Currency = require('./currency.model');
const Wallet = require('./wallet.model');
const TradeOrder = require('./tradeOrder.model');
const Transaction = require('./transaction.model');

User.hasMany(Wallet, { foreignKey: 'userId' });
User.hasMany(TradeOrder, { foreignKey: 'userId' });
User.hasMany(Transaction, { foreignKey: 'buyerId' });
User.hasMany(Transaction, { foreignKey: 'sellerId' });

Currency.hasMany(Wallet, { foreignKey: 'currencyId' });
Currency.hasMany(TradeOrder, { foreignKey: 'fromCurrencyId' });
Currency.hasMany(TradeOrder, { foreignKey: 'toCurrencyId' });

Wallet.belongsTo(Currency, { foreignKey: 'currencyId', as: 'currency' });

TradeOrder.belongsTo(User, { foreignKey: 'userId' });
TradeOrder.belongsTo(Currency, { foreignKey: 'fromCurrencyId' });
TradeOrder.belongsTo(Currency, { foreignKey: 'toCurrencyId' });

TradeOrder.hasMany(Transaction, { foreignKey: 'tradeOrderId' });
Transaction.belongsTo(TradeOrder, { foreignKey: 'tradeOrderId' });

Transaction.belongsTo(User, { foreignKey: 'buyerId' });
Transaction.belongsTo(User, { foreignKey: 'sellerId' });

module.exports = { User, Currency, Wallet, TradeOrder, Transaction };
