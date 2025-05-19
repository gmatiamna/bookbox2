import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useBuyAllBooksMutation } from '../slices/orderApi';
import { useClearCartMutation } from '../slices/cartApi';

const Success = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [buyAllBooks] = useBuyAllBooksMutation();
  const [clearCart] = useClearCartMutation();

  useEffect(() => {
    const completeOrder = async () => {
      const storedOrder = JSON.parse(localStorage.getItem('pendingOrder'));

      if (!storedOrder || !storedOrder.books || !userInfo) {
        console.error("Missing order or user info.");
        return;
      }

      try {
        await buyAllBooks({
          books: storedOrder.books,
          userId: userInfo.id
        }).unwrap();

        await clearCart();

        localStorage.removeItem('pendingOrder');
      } catch (error) {
        console.error('Failed to finalize the order:', error);
      }
    };

    completeOrder();
  }, [buyAllBooks, clearCart, userInfo]); // ✅ fixed dependency array

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">Thank you for your purchase.</p>
      <button
        onClick={() => navigate('/my-collection')}
        className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Check Your Collection
      </button>
    </div>
  );
};

export default Success;
