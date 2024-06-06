const mongoose = require('mongoose');
const { Schema } = mongoose;

const senderSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  IDNumber: { type: String, required: true }
});

const recipientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  accountNumber: { type: String, required: true },
  bank: { type: String, required: true }
});

const transactionSchema = new Schema({
  id: { type: String, required: true, unique: true },
  date: { type: Number, required: true },
  sender: { type: senderSchema, required: true },
  recipient: { type: recipientSchema, required: true },
  amount: { type: Number, required: true, min: 0 },
  currencyCd: { type: String, required: true },
  comments: { type: String, required: true },
  status: { type: String, required: true, enum: ['COMPLETED', 'IN PROGRESS', 'REJECTED', 'PENDING'] }
});

module.exports = mongoose.model('Transaction', transactionSchema);
