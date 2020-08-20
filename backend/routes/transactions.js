const express = require("express");

const TransController = require("../controllers/transactions");

const router = express.Router();

router.post('/addTrans', TransController.addTransaction);

router.get('/getTrans', TransController.getAllTransactions);

router.post('/deleteTrans', TransController.deleteTrans);

module.exports = router;
