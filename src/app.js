const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const transactionRoutes = require('./routes/transaction.routes');
const config = require('./config/config');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection and Server Start
connectDB()
  .then(() => {
    // Routes
    app.use('/api', transactionRoutes);

    // Start the server
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database. Server not started.', err);
  });
