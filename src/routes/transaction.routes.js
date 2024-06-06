const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

router.get('/transactions', transactionController.getAllTransactions)
router.get('/sort-transactions', transactionController.getTransactions);
router.post('/transactions', transactionController.addTransaction);
router.post('/load-transactions', transactionController.loadInitialData);
router.put('/transactions/:id', transactionController.editTransactionById);


module.exports = router;
