import React from "react";
import { useNavigate } from "react-router-dom";
import bestsellbg from "../assets/bestsellbg.png";

const BestSellerCard = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup", { state: { bookId: book._id } });
  };

  // sold should be added to the book model
  // ----------------------------------------
  const sold = book.sold ?? 10; // use 0% discount if `sold` is missing

  const priceCalculation = () => {
    // now using a dummy discount percent if `sold` is not provided !
    const discountPercent = book.sold || 10; // use 0% discount if `sold` is missing
    const discountAmount = (book.prix_achat / 100) * discountPercent;
    const finalPrice = book.prix_achat - discountAmount;
    return finalPrice.toFixed(2);
  };

  return (
    <div
      className="w-72 max-h-[504px] overflow-hidden rounded-2xl p-4 text-center text-white"
      style={{
        backgroundImage: `url(${bestsellbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-5xl font-[zain] mb-0 pt-4">Best Seller</h2>
      <p className="text-[0.75rem] font-normal opacity-75">
        Based on sales this week
      </p>
      <img
        src={book.imageCouverture}
        alt={book.titre}
        className="mx-auto rounded-lg p-4 max-h-[60%]"
      />

      <p className="my-2 text-white text-sm font-semibold">{book.titre}</p>
      {/* <p className="text-sm text-white">{book.auteur}</p> */}
      <p className="my-2 text-xs text-white font-light">
        {book.categorie?.join(", ")}
      </p>
      {sold === 0 ? (
        <button
          onClick={handleClick}
          className="bg-white w-[50%] h-[40px] text-black text-xs mx-auto p-2 font-bold flex items-center justify-center rounded-lg hover:cursor-pointer"
        >
          {book.prix_achat.toFixed(2)} DT
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="bg-white w-[50%] h-[40px] text-black mx-auto p-2 flex items-center justify-center gap-2 rounded-lg hover:cursor-pointer"
        >
          <p className="line-through text-gray-500 font-bold text-[0.625rem] -mb-1 ">
            {book.prix_achat.toFixed(2)}
          </p>
          <p className="font-bold text-xs px-1">{priceCalculation()} DT</p>
        </button>
      )}
    </div>
  );
};

export default BestSellerCard;
