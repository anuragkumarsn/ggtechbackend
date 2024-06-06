const mongoose = require('mongoose');
const config = require('./config/config');

const connectDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.mongoUri, {});

    mongoose.connection.on('connected', () => {
      console.log('Database connected successfully');
      resolve();
    });

    mongoose.connection.on('error', (err) => {
      console.error('Database connection error:', err);
      reject(err);
    });
  });
};

module.exports = connectDB;
