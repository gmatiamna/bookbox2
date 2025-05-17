const Cart = require('../models/Cart');
const Book = require('../models/Book');

// Get current user's cart
const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    .populate('items.book', 'titre imageCouverture prix_achat prix_location');
    if (!cart) return res.status(200).json({ items: [] });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart', error: err.message });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  const { bookId, type, quantity } = req.body;

  if (!bookId || !type) {
    return res.status(400).json({ message: 'Book ID and type are required' });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const prix = type === 'achat' ? book.prix_achat : book.prix_location;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(
      item => item.book.toString() === bookId && item.type === type
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        book: bookId,
        type,
        quantity: quantity || 1,
        prix,
      });
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add to cart', error: err.message });
  }
};

// Update quantity/type of a specific item
const updateCartItem = async (req, res) => {
  const { itemId, quantity, type } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (quantity !== undefined) item.quantity = quantity;
    if (type) {
      const book = await Book.findById(item.book);
      item.type = type;
      item.prix = type === 'achat' ? book.prix_achat : book.prix_location;
    }

    await cart.save();
    res.status(200).json({ message: 'Cart item updated', cart });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update item', error: err.message });
  }
};

// Remove a single item from cart
const removeFromCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();

    res.status(200).json({ message: 'Item removed', cart });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove item', error: err.message });
  }
};

// Clear all items in the cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear cart', error: err.message });
  }
};

module.exports = {
  getUserCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
