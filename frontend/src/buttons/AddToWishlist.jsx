// src/BookDetailsComponts/AddToWishlistButton.js
import React from "react";
import { useAddToWishlistMutation } from "../slices/wishlistApi";
import wishicon from "../assets/wishlist-svgrepo-com.svg";
const AddToWishlistButton = ({ bookId }) => {
  const [addToWishlist, { isLoading }] = useAddToWishlistMutation();

  const handleAdd = async () => {
    try {
      await addToWishlist(bookId).unwrap();
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
    }
  };

  return (
    <button
  onClick={handleAdd}
  disabled={isLoading}
  className="rounded border-2 border-transparent hover:border-[#724521] hover:bg-white transition-colors duration-300 -mt-6"
>
  {isLoading ? (
    "Adding..."
  ) : (
    <img src={wishicon} alt="" className="w-[40px] h-[50px]" />
  )}
</button>

  );
};

export default AddToWishlistButton;
