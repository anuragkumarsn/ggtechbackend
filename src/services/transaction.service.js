const Transaction = require('../models/transaction.model');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

exports.getAllTransactions = async()=>{
  const transaction = await Transaction.find()
      .sort({date: -1}) // Sort transactions by date in descending order
      .where('status').in(['COMPLETED', 'IN PROGRESS', 'REJECTED', 'PENDING']);
  return transaction;
}


exports.getTransactions = async (startDate, endDate) => {
  const transactions = await Transaction.find({
    date: {
      $gte: startDate,
      $lte: endDate
    },
    status: { $in: ["COMPLETED", "IN PROGRESS", "REJECTED", "PENDING"] }
  }).sort({ date: 1 });

  return transactions;
};

exports.addTransaction = async (transactionData) => {
  const transaction = new Transaction(transactionData);
  await transaction.save();
  return transaction;
};

exports.loadInitialData = async () => {
  const dataPath = path.join(__dirname, '../data/transactions.json');
  const transactions = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  await Transaction.insertMany(transactions);
};

exports.editTransactionById = async (id, newData) => {
  console.log('Edit Call to database for' , id)
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid transaction ID');
    }
    const objectId = new mongoose.Types.ObjectId(id);
    console.log(objectId);
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      objectId,
      newData,
      { new: true }
    );

    if (!updatedTransaction) {
      throw new Error('Transaction not found');
    }

    return updatedTransaction;
  } catch (error) {
    throw new Error(error.message);
  }
};

