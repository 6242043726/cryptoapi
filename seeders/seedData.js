const { User, Currency, Wallet } = require("../models");
const sequelize = require("../config/database");

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate([
      { username: "User1", email: "User1@gmail.com", password: "123456" },
      { username: "User2", email: "User2@gmail.com", password: "123456" },
    ]);

    const currencies = await Currency.bulkCreate([
      { name: "Bitcoin", symbol: "BTC", type: "crypto" },
      { name: "Ethereum", symbol: "ETH", type: "crypto" },
      { name: "US Dollar", symbol: "USD", type: "fiat" },
      { name: "Thai Baht", symbol: "THB", type: "fiat" },
    ]);

    await Wallet.bulkCreate([
      { userId: users[0].id, currencyId: currencies[0].id, balance: 1.5 }, 
      { userId: users[0].id, currencyId: currencies[2].id, balance: 1000.0 },
      { userId: users[1].id, currencyId: currencies[1].id, balance: 3.0 }, 
      { userId: users[1].id, currencyId: currencies[3].id, balance: 1500.0 }, 
    ]);

  } catch (error) {
    console.error("Error seeding data: ", error);
  }
};

module.exports = seedData;
