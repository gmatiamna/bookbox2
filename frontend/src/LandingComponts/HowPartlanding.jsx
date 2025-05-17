import React from "react";
import browse from "../assets/landing/browsebook.svg";
import store from "../assets/landing/store.svg";
import rentat from "../assets/landing/rentAT.svg";
import books from "../assets/landing/booksicon.svg";
const HowCompant=()=>{
    return(
<div className="w-[90%] mx-auto text-center mt-10">
  <h1 className="font-[Zain] font-bold text-[52px] leading-[100%] tracking-[0] text-[#00BAC7]">
    How It Works ?
  </h1>
  <p className="font-[Zain] font-light text-[16px] leading-[100%] tracking-[0] text-black mt-2">
    From first click to your next favorite read — here’s how BookBox makes it simple
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
    {/* Step 1 */}
    <div className="flex flex-col items-center gap-3">
      <h3 className="font-[Zain] font-bold text-[18px] ml-4  text-[#00BAC7]">Browse Books</h3>
      <div className="relative w-[180px] h-[180px] bg-[#DCEDF1] rounded-tr-[8px]  -mt-4  rounded-bl-[8px] rounded-br-[8px] flex items-center justify-center">
      <h2 className="absolute -top-[20px] text-[#00BAC7] left-0 w-[30px] h-[30px] bg-gradient-to-b from-[#90C3D0] to-[#DCEDF1] rounded-tl-[8px] rounded-tr-[8px] flex items-center justify-center font-[Zain] font-bold">
    1
  </h2>
        <img src={browse} alt="" className="w-[80%]" />
      </div>
      <p className="font-[Zain] font-light text-[16px] leading-[100%] tracking-[0] text-black text-center">
        Explore thousands of titles across every genre.
      </p>
    </div>

    {/* Step 2 */}
    <div className="flex flex-col items-center gap-3">
      <h3 className="font-[Zain] font-bold text-[18px]  ml-6  text-[#00BAC7]">Buy, Rent, or Subscribe</h3>
      <div className=" relative w-[180px] h-[180px] bg-[#DCEDF1] rounded-tr-[8px] -mt-4  rounded-bl-[8px] rounded-br-[8px] flex items-center justify-center">
      <h2 className="absolute -top-[20px] text-[#00BAC7] left-0 w-[30px] h-[30px] bg-gradient-to-b from-[#90C3D0] to-[#DCEDF1] rounded-tl-[8px] rounded-tr-[8px] flex items-center justify-center font-[Zain] font-bold">
    2
  </h2>
        <img src={store} alt="" className="w-[80%]" />
      </div>
      <p className="font-[Zain] font-light text-[16px] leading-[100%] tracking-[0] text-black text-center">
        Choose the option that fits your reading style.
      </p>
    </div>

    {/* Step 3 */}
    <div className="flex flex-col items-center gap-3">
      <h3 className="font-[Zain] font-bold text-[18px]  ml-10  text-[#00BAC7]">Read Anytime, Anywhere</h3>
      <div className="relative w-[180px] h-[180px] bg-[#DCEDF1] rounded-tr-[8px]  -mt-4  rounded-bl-[8px] rounded-br-[8px] flex items-center justify-center">
  <h2 className="absolute -top-[20px] text-[#00BAC7] left-0 w-[30px] h-[30px] bg-gradient-to-b from-[#90C3D0] to-[#DCEDF1] rounded-tl-[8px] rounded-tr-[8px] flex items-center justify-center font-[Zain] font-bold">
    3
  </h2>
  <img src={rentat} alt="" className="w-[80%]" />
</div>

      <p className="font-[Zain] font-light text-[16px] leading-[100%] tracking-[0] text-black text-center">
        Access your books on any device, whenever you want.
      </p>
    </div>

    {/* Step 4 */}
    <div className="flex flex-col items-center gap-3">
      <h3 className="font-[Zain] font-bold text-[18px] ml-4  text-[#00BAC7]">Manage Your Library</h3>
      <div className=" relative w-[180px] h-[180px] bg-[#DCEDF1] -mt-4 rounded-tr-[8px] rounded-bl-[8px] rounded-br-[8px] flex items-center justify-center">
       <h2 className="absolute -top-[20px] text-[#00BAC7] left-0 w-[30px] h-[30px] bg-gradient-to-b from-[#90C3D0] to-[#DCEDF1] rounded-tl-[8px] rounded-tr-[8px] flex items-center justify-center font-[Zain] font-bold">
    4
  </h2>
        <img src={books} alt="" className="w-[80%]" />
      </div>
      <p className="font-[Zain] font-light text-[16px] leading-[100%] tracking-[0] text-black text-center">
        Keep tracking what you love, want, or are reading.
      </p>
    </div>
  </div>
 <button className="bg-[#00BAC7] text-white font-[Zain] font-normal text-[24px] leading-[100%] tracking-[0px] text-center align-middle px-6 py-3 rounded-md mx-auto mt-10">
  Give it a shot
</button>

</div>

   )
;}
export default HowCompant;