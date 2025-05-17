import React from "react";
import { useNavigate } from "react-router-dom";
import bestsellbg from "../assets/bestsellbg.png";

const BestSellerCard = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup", { state: { bookId: book._id } });
  };

  return (
    <div
      className="w-72 rounded-2xl p-4 text-center text-white"
      style={{
        backgroundImage: `url(${bestsellbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-xl font-[zain] mb-1">Best Seller</h2>
      <p className="text-sm mb-4 opacity-75">Based on sales this week</p>

      
        <img
          src={book.imageCouverture}
          alt={book.titre}
          className="mx-auto rounded-[10px] p-4"
        />

    
              <p className="mt-3 text-white text-sm font-semibold">{book.titre}</p>
        <p className="text-xs text-white">{book.auteur}</p>
        <p className="text-xs text-white italic">
          Genres: {book.categorie?.join(", ")}
        </p>
        <button
          onClick={handleClick}
          className=" bg-white w-[50%] h[40px] text-black text-xs ml-14 p-2 pl-12"
        >
           {book.prix_achat} DT
        </button>
    </div>
  );
};

export default BestSellerCard;
