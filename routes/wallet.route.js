const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');

router.get('/wallets/user/:userId', walletController.getWalletByUserId);

module.exports = router;
