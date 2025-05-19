import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartBuyButton = ({ cartItems, selectedTypes }) => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const history = useNavigate();

  const userInfo = useSelector((state) => state.auth.userInfo);

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
      let totalAmount = 0;

      const books = cartItems.map((item) => {
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

        totalAmount += price*1000;
   console.log("Sending amount:", totalAmount);
        return {
          book: bookId,
          type: selectedType,
          price,
          location_debut: rentedFrom,
          location_fin: rentedTo,
        };
      });

      if (books.length === 0) {
        alert('No valid books to purchase. Please check your cart.');
        return;
      }

      localStorage.setItem('pendingOrder', JSON.stringify({
        books,
        userId: userInfo.id,
      }));

      const response = await fetch("http://localhost:5000/api/payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: totalAmount })
      });

      const data = await response.json();
      if (data?.result?.link) {
        window.location.href = data.result.link;
      } else {
        throw new Error("No payment link received.");
      }

    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Failed to initiate payment.");
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <button
      onClick={handleBuyAll}
      disabled={isPurchasing}
      className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
    >
      {isPurchasing ? 'Processing...' : 'Buy All'}
    </button>
  );
};

CartBuyButton.propTypes = {
  cartItems: PropTypes.array.isRequired,
  selectedTypes: PropTypes.object.isRequired,
};

export default CartBuyButton;
