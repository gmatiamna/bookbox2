
import React from "react";

const WishlistBookDetails = ({ book, onRemove }) => {
  return (
    <div
      key={book._id}
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
    >
      <img
        src={book.imageCouverture}
        alt={book.titre}
        className="w-full h-56 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-[#724521]">{book.titre}</h3>
        <p className="text-sm text-gray-600 mb-2">by {book.auteur}</p>
        <p className="text-[#724521] font-bold mb-4">{book.prix_achat} DTN</p>
        <button
          onClick={() => onRemove(book._id)}
          className="mt-auto bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-xl text-sm transition-all"
        >
          Remove from Wishlist
        </button>
      </div>
    </div>
  );
};

export default WishlistBookDetails;
