const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); 
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

app.use(express.json());

app.use(cookieParser());

// MongoDB connection


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message || err,
  });
});
// Use routes for user operations
app.use('/api/user', userRoutes); 

const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

});
