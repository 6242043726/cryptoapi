const { Wallet, TradeOrder, Transaction } = require("../models");

exports.createTradeOrder = async (req, res) => {
  const { userId, fromCurrencyId, toCurrencyId, amount, price } = req.body;
  try {
    const tradeOrder = await TradeOrder.create({
      userId,
      fromCurrencyId,
      toCurrencyId,
      amount,
      price,
      status: "open",
    });

    const matchedOrder = await TradeOrder.findOne({
      where: {
        fromCurrencyId: toCurrencyId,
        toCurrencyId: fromCurrencyId,
        status: "open",
        price: price,
      },
    });

    if (matchedOrder) {
      const transaction = await Transaction.create({
        tradeOrderId: matchedOrder.id,
        buyerId: matchedOrder.userId,
        sellerId: userId,
        amount: matchedOrder.amount,
        price: matchedOrder.price,
      });

      const sellerWallet = await Wallet.findOne({
        where: { userId: matchedOrder.userId, currencyId: fromCurrencyId },
      });

      if (sellerWallet.balance < matchedOrder.amount) {
        return res.status(400).json({
          error:
            "Insufficient balance in seller wallet to complete the transaction.",
        });
      }

      await sellerWallet.update({
        balance: sellerWallet.balance - matchedOrder.amount,
      });

      const buyerWallet = await Wallet.findOne({
        where: { userId: userId, currencyId: toCurrencyId },
      });

      await buyerWallet.update({
        balance: buyerWallet.balance + matchedOrder.amount,
      });

      await matchedOrder.update({ status: "completed" });
      await tradeOrder.update({ status: "completed" });

      res.status(201).json({
        message: "TradeOrder matched and Transaction created successfully",
        transaction,
      });
    } else {
      res.status(201).json({
        message: "TradeOrder created but no match found. Waiting for match.",
        tradeOrder,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get trade order
exports.getTradeOrders = async (req, res) => {
    try {
      const tradeOrders = await TradeOrder.findAll();
      res.status(200).json(tradeOrders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };