import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartApi } from '../slices/cartApi';
import { useBuyAllBooksMutation } from '../slices/orderApi';
import { useClearCartMutation } from '../slices/cartApi';

const CartBuyButton = ({ cartItems, selectedTypes }) => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const [buyAllBooks, { isLoading }] = useBuyAllBooksMutation();
  const [clearCart] = useClearCartMutation();

  const handleBuyAll = async () => {
    if (!userInfo) {
      console.error('User is not authenticated');
      history("/login");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      console.error('No items in the cart to purchase');
      return;
    }

    setIsPurchasing(true);

    try {
      const now = new Date();

      const orderData = {
        books: cartItems.map((item) => {
          const bookData = item.book || item;
          const bookId = bookData._id;

          const selectedType = selectedTypes?.[bookId] || item.type;

          const price = selectedType === 'achat'
            ? bookData.prix_achat
            : bookData.prix_location;

          const rentedFrom = selectedType === 'location' ? now.toISOString() : null;
          const rentedTo = selectedType === 'location'
            ? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
            : null;

          if (!bookId || price === undefined) {
            console.error('Invalid book data:', item);
            return null;
          }

          return {
            book: bookId,
            type: selectedType,
            price,
            location_debut: rentedFrom,
            location_fin: rentedTo,
          };
        }).filter(Boolean),
        userId: userInfo.id,
      };

      if (orderData.books.length === 0) {
        alert('No valid books to purchase. Please check your cart.');
        return;
      }

      dispatch(cartApi.util.invalidateTags(['Cart']));
      const response = await buyAllBooks(orderData).unwrap();
      console.log("✅ Response from server:", response);
      await clearCart();
      history("/my-collection");

    } catch (error) {
      console.error('Error purchasing items:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <button
      onClick={handleBuyAll}
      disabled={isPurchasing || isLoading}
      className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
    >
      {isPurchasing || isLoading ? 'Processing...' : 'Buy All'}
    </button>
  );
};

CartBuyButton.propTypes = {
  cartItems: PropTypes.array.isRequired,
  selectedTypes: PropTypes.object.isRequired,
};

export default CartBuyButton;
