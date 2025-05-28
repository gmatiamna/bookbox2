// src/pages/Wishlist.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "../slices/wishlistApi";
import Nav from "../components/nav";
import WishlistBookDetails from "../WishlistCompands/WishlistBookDetails";
import Animation from "../assets/animation/Animtinlottie";
const Wishlist = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: wishlist, isLoading, error } = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  if (!userInfo) return <Navigate to="/login" />;

  const handleRemove = async (bookId) => {
    try {
      await removeFromWishlist(bookId).unwrap();
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
    }
  };

  return (
    <div className="min-h-screen w-full  mt-20">
      <Nav />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-[#724521] mb-6">My Wishlist</h2>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Failed to load wishlist.</p>}

       {wishlist?.books?.length === 0 && !isLoading && (
  <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-gray-600 text-center">
    <Animation />
    <p>Your wishlist is empty. Add the books you want to read later here!</p>
    <Link
      to="/library"
      className="bg-[#724521] text-white px-6 py-2 rounded-xl hover:bg-[#a0642f] transition-colors w-[200px] text-center"
    >
      Go to Library
    </Link>
  </div>
)}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist?.books?.map((book) => (
            <WishlistBookDetails key={book._id} book={book} onRemove={handleRemove} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
