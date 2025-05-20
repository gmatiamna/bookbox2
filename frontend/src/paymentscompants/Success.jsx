import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useBuyAllBooksMutation } from '../slices/orderApi';
import { useClearCartMutation } from '../slices/cartApi';
import { CheckCircle2 } from 'lucide-react'; // Optional icon

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
  }, [buyAllBooks, clearCart, userInfo]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-yellow-50 px-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center animate-fade-in">
        <div className="flex items-center justify-center mb-4 text-green-600">
          <CheckCircle2 size={48} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#724521] mb-2">Payment Successful!</h1>
        <p className="text-gray-700 text-md mb-6">
          Thank you for your purchase. Your books have been added to your collection.
        </p>
        <button
          onClick={() => navigate('/my-collection')}
          className="mt-2 px-6 py-2 bg-[#724521] text-white rounded-xl hover:bg-[#5c381a] transition"
        >
          📚 Check Your Collection
        </button>
      </div>
    </div>
  );
};

export default Success;
