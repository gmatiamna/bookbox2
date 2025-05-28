import React, { useState } from "react";
import { useGetUserCartQuery } from "../slices/cartApi";
import { useBuyAllBooksMutation } from "../slices/orderApi";
import CartBuyButton from "../buttons/CartBuyAllButton";
import Nav from "../components/nav";
import { useNavigate } from "react-router-dom";
import AnimationCart from "../assets/animation/AnimationCart";
const Cart = () => {
  const { data: cart, isLoading, isError, error } = useGetUserCartQuery();
  const [buyAllBooks, { isLoading: isBuyingAll }] = useBuyAllBooksMutation();
  const [selectedTypes, setSelectedTypes] = useState({});
const navigate = useNavigate();
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-[#724521] text-lg">
        Loading your cart...
      </div>
    );

  if (isError || !cart) {
    console.error("Cart fetch error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        Failed to load your cart.
      </div>
    );
  }

  const calculatePriceWithDiscount = (book, type) => {
    const basePrice = type === "achat" ? book.prix_achat : book.prix_location;
    const discount = book.discount || 0;
    return basePrice - (basePrice * discount) / 100;
  };

  const handleAddToCart = async (item) => {
    const selectedType = selectedTypes[item.book._id] || item.type;
    console.log(`${selectedType} added to cart successfully`);
  };

const handleBuyAll = async () => {
  const booksToBuy = cart.items.map((item) => {
    const selectedType = selectedTypes[item.book._id] || item.type;
    const now = new Date();
    const rentedFrom = selectedType === "location" ? now.toISOString() : null;
    const rentedTo =
      selectedType === "location"
        ? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
        : null;

    return {
      book: item.book._id,
      type: selectedType,
      price: calculatePriceWithDiscount(item.book, selectedType),
      location_debut: rentedFrom,
      location_fin: rentedTo,
    };
  });

  try {
    await buyAllBooks({ books: booksToBuy }).unwrap();
    console.log("All items purchased successfully.");
    navigate("/library"); // ✅ Redirect to Library page
  } catch (err) {
    console.error("Failed to buy all:", err);
  }
};


  const totalPrice = cart.items.reduce((sum, item) => {
    const selectedType = selectedTypes[item.book._id] || item.type;
    const discountedPrice = calculatePriceWithDiscount(item.book, selectedType);
    return sum + discountedPrice * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="max-w-6xl mx-auto px-4 py-8 mt-24">
        <h2 className="text-3xl font-bold text-[#724521] mb-6">Your Cart</h2>

        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-gray-600 text-center">
            <AnimationCart/>
            <p className="text-lg">Your cart is empty.</p>
            <p className="mt-2">
              Explore the <span className="text-[#724521] font-semibold">Library</span> to add books!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.items.map((item) => {
              const selectedType = selectedTypes[item.book._id] || item.type;
              const discountedPrice = calculatePriceWithDiscount(item.book, selectedType);
              const originalPrice =
                selectedType === "achat"
                  ? item.book.prix_achat
                  : item.book.prix_location;
              const hasDiscount = item.book.discount > 0;

              return (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row gap-4 bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition"
                >
                  <img
                    src={item.book.imageCouverture}
                    alt={item.book.titre}
                    className="w-full md:w-[120px] h-[180px] object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-semibold text-[#333]">
                        {item.book.titre}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">
                        by {item.book.author || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Type:{" "}
                        <span className="font-medium capitalize text-[#724521]">
                          {selectedType === "achat" ? "Buy" : "Rent"}
                        </span>
                      </p>

                      {hasDiscount ? (
                        <p className="text-sm">
                          <span className="line-through text-gray-400 mr-2">
                            {originalPrice} pts
                          </span>
                          <span className="text-green-600 font-semibold">
                            {discountedPrice} pts
                          </span>
                        </p>
                      ) : (
                        <p className="text-sm text-[#333] font-medium">
                          {originalPrice} pts
                        </p>
                      )}

                      {item.completed && (
                        <p className="text-green-700 font-semibold mt-2">
                          Already {item.type === "achat" ? "Purchased" : "Rented"}
                        </p>
                      )}
                    </div>

                    {!item.completed && (
                      <div className="flex flex-col sm:flex-row gap-2 items-start mt-4">
                        <select
                          className="border border-[#ccc] rounded px-3 py-2 focus:ring-[#724521]"
                          value={selectedType}
                          onChange={(e) =>
                            setSelectedTypes((prev) => ({
                              ...prev,
                              [item.book._id]: e.target.value,
                            }))
                          }
                        >
                          <option value="achat">Buy</option>
                          <option value="location">Rent</option>
                        </select>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-[#724521] text-white px-5 py-2 rounded hover:bg-[#5c3a1a] transition"
                          disabled={isBuyingAll}
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Total and Buy All Button */}
            <div className="flex justify-between items-center bg-[#f1ece6] p-4 rounded-xl shadow mt-6">
              <span className="text-lg font-bold text-[#333]">
                Total:{" "}
                <span className="text-[#724521]">{totalPrice.toFixed(2)} pts</span>
              </span>

              <CartBuyButton
                cartItems={cart.items}
                selectedTypes={selectedTypes}
                totalPrice={totalPrice}
                onClick={handleBuyAll}
                disabled={isBuyingAll}
                className="bg-[#724521] text-white px-6 py-2 rounded-lg hover:bg-[#5a3618]"
              >
                {isBuyingAll ? "Processing..." : "Buy All"}
              </CartBuyButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
