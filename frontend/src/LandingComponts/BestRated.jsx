import React from "react";
import imggirl from "../assets/landing/img-girl.png";
import buynowicon from "../assets/landing/buynow icon.svg";
import books from "../assets/landing/Group 37839.png";
import { useGetMostRatedBookQuery } from "../slices/bookApi"; 

const BestRated = () => {
  const { data, error, isLoading } = useGetMostRatedBookQuery();

  if (isLoading) return <div>Loading best rated book...</div>;
  if (error) return <div>Error loading book data</div>;

  const book = data?.data; 
  if (!book) return <div>No best rated book found</div>;

  return (
    <div className="w-full relative pb-[250px]">
      {/* Top Section */}
      <div className="w-[70%] mx-auto flex mt-20 relative">
        <img src={imggirl} alt="Decorative" className="absolute top-0 w-[45%]" />
        
        <div className="flex gap-4 z-10 absolute right-0 top-20 w-[65%]">
          <div>
            <h2 className="font-zain font-bold text-[20px] leading-[16px] uppercase text-[#9FB11D]">
              Best Rated <span style={{ color: 'yellow', fontSize: '20px', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>★ ★ ★ ★ ★</span>
            </h2>
            <img 
              src={book.imageCouverture} 
              alt={`Cover of ${book.titre}`} 
              className="w-full"
            />
          </div>

          <div className="grid gap-10">
            <h3 className="font-zain font-extrabold text-[100px] leading-[100px] text-black">
              {book.titre}
            </h3>
            <p className="font-zain font-medium text-[28px] leading-[100px] text-[#435058]">
              By {book.auteur}
            </p>
            <div className="flex gap-4">
              <button className="bg-[#F1F2EE] w-[184px] h-[62px] rounded-[40px] px-[40px] py-[15px] font-zain text-[20px] leading-[32px] tracking-[0.2px] text-[#525E16] text-center">
                More Info
              </button>
              <button className="flex items-center justify-center bg-[#CCDC3F] w-[184px] h-[62px] rounded-[40px] gap-[10px] px-[40px] py-[15px] text-[#525E16] font-zain text-[20px] leading-[32px] tracking-[0.2px] text-center">
                Buy Now
                <img src={buynowicon} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-[90%] h-[218px] bg-[#AA7324] rounded-[20px] mx-auto mt-[600px] relative flex justify-between items-center px-8 py-6">
        <div>
          <h1 className="font-zain font-bold text-[52px] leading-[100%] tracking-[0px] text-white">
            Earn <span className="text-[#CCDC3F]">Points</span>, Unlock <span className="text-[#CCDC3F]">Free</span> Reads
          </h1>
          <p className="font-zain font-normal text-[24px] leading-[32px] text-white mt-2">
            Buy books or subscribe to earn points with every action.
            <br />Stack them up — and use them to rent books for free!
            <br /><br />The more you read, the more you unlock
          </p>
        </div>
        <img src={books} alt="Books" className="absolute right-0 rounded-[20px] object-contain" />
      </div>
    </div>
  );
};

export default BestRated;
