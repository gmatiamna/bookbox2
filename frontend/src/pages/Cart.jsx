import React, { useState } from "react";
import { useGetUserCartQuery } from "../slices/cartApi";
import { useBuyAllBooksMutation } from "../slices/orderApi";
import CartBuyButton from "../buttons/CartBuyAllButton";
import Nav from "../components/nav";

const Cart = () => {
  const { data: cart, isLoading, isError, error } = useGetUserCartQuery();
  const [buyAllBooks, { isLoading: isBuyingAll }] = useBuyAllBooksMutation();
  const [selectedTypes, setSelectedTypes] = useState({}); // key by book._id

  if (isLoading) return <div>Loading cart...</div>;
  if (isError || !cart) {
    console.error("Cart fetch error:", error);
    return <div>Failed to load cart.</div>;
  }

  const calculatePriceWithDiscount = (book, type) => {
    const basePrice = type === "achat" ? book.prix_achat : book.prix_location;
    const discount = book.discount || 0;
    return basePrice - (basePrice * discount) / 100;
  };

  const handleAddToCart = async (item) => {
    const selectedType = selectedTypes[item.book._id] || item.type;
    try {
      // No actual logic here unless needed for single-item confirmation
      console.log(`${selectedType} added to cart successfully`);
    } catch (err) {
      console.error(`Failed to add ${selectedType} to cart:`, err);
    }
  };

 const handleBuyAll = async () => {
  const booksToBuy = cart.items.map((item) => {
    const selectedType = selectedTypes[item.book._id] || item.type;

    const now = new Date();
    const rentedFrom = selectedType === 'location' ? now.toISOString() : null;
    const rentedTo = selectedType === 'location'
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
    await buyAllBooks({ books: booksToBuy }).unwrap(); // ✅ Use booksToBuy here
    console.log("All items purchased successfully.");
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
    <div>
      <Nav />
      <div className="p-4 mt-20">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>

        {cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.items.map((item) => {
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
                className="flex items-center justify-between bg-white shadow p-4 rounded mb-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.book.imageCouverture}
                    alt={item.book.titre}
                    className="w-[100px] h-[150px] object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.book.titre}</h3>
                    <p>
                      Price:{" "}
                      {hasDiscount ? (
                        <>
                          <span className="line-through text-gray-500">
                            {originalPrice} pts
                          </span>{" "}
                          <span className="text-green-600 font-semibold">
                            {discountedPrice} pts
                          </span>
                        </>
                      ) : (
                        <span>{originalPrice} pts</span>
                      )}
                    </p>
                    {item.completed && (
                      <p className="text-green-600 font-medium">
                        Already {item.type === "achat" ? "Purchased" : "Rented"}
                      </p>
                    )}
                  </div>
                </div>

                {!item.completed && (
                  <div className="flex flex-col gap-2 items-end">
                    <select
                      className="border rounded px-2 py-1"
                      value={selectedTypes[item.book._id] || item.type}
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
                      className="bg-green-600 text-white px-4 py-2 rounded"
                      disabled={isBuyingAll}
                    >
                      {isBuyingAll ? "Processing..." : "Confirm"}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Total and Buy All Section */}
        {cart.items.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded shadow flex justify-between items-center">
            <span className="font-semibold text-lg">
              Total: {totalPrice.toFixed(2)} pts
            </span>

            <CartBuyButton
              cartItems={cart.items}
              selectedTypes={selectedTypes}
              totalPrice={totalPrice}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
              onClick={handleBuyAll}
              disabled={isBuyingAll}
            >
              {isBuyingAll ? "Processing..." : "Buy All"}
            </CartBuyButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;