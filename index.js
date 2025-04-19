const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouters = require('./routes/userRoutes'); 
const bookRouters = require('./routes/bookRouters'); 
const adminRouters = require('./routes/adminRouters'); 
const cookieParser = require('cookie-parser');
const wishlistRoutes = require('./routes/wishlistRoutes');
const offerRoutes = require('./routes/offerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderNotificationRoutes = require('./routes/orderNotificationRoutes');  

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(cookieParser());

// MongoDB connection

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err));

  app.use('/api/admin', adminRouters);
app.use('/api/books', bookRouters);
app.use('/api/user', userRouters); 
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/notifications', orderNotificationRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message || err,
  });
});


const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

});
