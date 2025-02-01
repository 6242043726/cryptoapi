const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/user.route");
const tradeOrderRoutes = require('./routes/tradeOder.route');
const transactionRoutes = require('./routes/transaction.route');
const walletRoutes = require('./routes/wallet.route');
const seedData = require("./seeders/seedData");

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", tradeOrderRoutes);
app.use("/api", transactionRoutes);
app.use('/api', walletRoutes);

sequelize.sync().then(() => {
  seedData();
  app.listen(3000, () => console.log("Server running on port 3000"));
});
