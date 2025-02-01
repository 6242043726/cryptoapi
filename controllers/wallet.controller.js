const { Wallet, Currency } = require("../models");

const getWalletByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const wallets = await Wallet.findAll({
      where: { userId },
      include: [{ model: Currency, as: "currency" }],
    });

    if (!wallets || wallets.length === 0) {
      return res
        .status(404)
        .json({ message: "Wallets not found for this user." });
    }

    res.status(200).json(wallets);
  } catch (error) {
    console.error("Error retrieving wallet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getWalletByUserId };
