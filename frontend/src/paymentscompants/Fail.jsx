import React from "react";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react"; // optional red error icon

const Fail = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-red-50 px-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center animate-fade-in">
        <div className="flex items-center justify-center mb-4 text-red-600">
          <XCircle size={48} className="text-red-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-red-600 mb-2">Payment Failed</h2>
        <p className="text-gray-700 text-md mb-6">
          Something went wrong with the transaction. Please try again.
        </p>
        <Link
          to="/cart"
          className="mt-2 px-6 py-2 bg-[#724521] text-white rounded-xl hover:bg-[#5c381a] transition"
        >
          🛒 Go Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default Fail;
