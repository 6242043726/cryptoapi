const express = require("express");
const router = express.Router();
const tradeOrderController = require("../controllers/tradeOder.controller");

router.post("/trade-order", tradeOrderController.createTradeOrder);
router.get("/trade-orders", tradeOrderController.getTradeOrders);

module.exports = router;
