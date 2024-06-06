const transactionService = require('../services/transaction.service');

exports.getAllTransactions = async (req, res) =>{
    try {
        const transactions = await transactionService.getAllTransactions()
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getTransactions = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const transactions = await transactionService.getTransactions(startDate, endDate);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.addTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loadInitialData = async (req, res) => {
  try {
    await transactionService.loadInitialData();
    res.status(200).json({ message: 'Data loaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editTransactionById = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  console.log('Update API Called');
  try {
    const updatedTransaction = await transactionService.editTransactionById(id, newData);
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

