import React from "react";
import { Link } from "react-router-dom";

const Fail = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h2>
      <p className="mb-6 text-lg">Something went wrong with the transaction.</p>
      <Link
        to="/cart"
        className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
      >
        Go Back to Cart
      </Link>
    </div>
  );
};

export default Fail;
