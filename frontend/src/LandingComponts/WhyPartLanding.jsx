import React from "react";
import UXBook from "../assets/landing/UXDesignerBook.png";
import Dvgenre from "../assets/landing/dv-genre.svg";
import flexicon from "../assets/landing/flix-icon.svg";
import PP from "../assets/landing/Pers-Pick.svg";
import clock from "../assets/landing/clockicon.svg";
import { ChevronRight } from "lucide-react";

const WhyCompant=()=>{
    return(
        <div>
             <div  className="flex gap-[100px] w-[90%] mt-10 mx-auto">
<img src={UXBook} alt="" />
<div>
    <h1 className="font-[Zain] font-bold text-[52px] leading-[100%] tracking-[0] text-[#C5922D] mb-14">Why Choose BookBox?</h1>
<h3 className="font-[Zain] font-400 text-[24px] leading-[100%] tracking-[0]  mb-6">
  <span className="text-[#C5922D]">Vast Library : </span> Thousands of books across every genre you love.
</h3>
    <h3  className="font-[Zain] font-400 text-[24px] leading-[100%] tracking-[0]  mb-6">
        <span className="text-[#C5922D]">Flexible Rentals : </span> Pay only for what you read, when you read it.</h3>
    <h3  className="font-[Zain] font-400 text-[24px] leading-[100%] tracking-[0]  mb-6">
        <span className="text-[#C5922D]">Exclusive Access :  </span>Special editions and early releases just for members.</h3>
    <h3  className="font-[Zain] font-400 text-[24px] leading-[100%] tracking-[0]  mb-6">
        <span className="text-[#C5922D]"> Smart Suggestions : </span> Get picks tailored to your taste — instantly.</h3>
 <button className="w-[128px] h-[58px] mt-2 pl-[20px] rounded-[10px] font-[Zain] font-bold text-[24px] leading-[16px] tracking-[0] text-[#885520] bg-[#EBDB9D] hover:bg-[#d7c585] hover:shadow-md transition duration-300 flex items-center gap-2">
  Join Now <ChevronRight />
</button>
</div>
 </div>
    

  <div className="flex gap-32 flex-wrap w-[90%] mx-auto mt-14">
  {/* 1. Diverse Genres */}
  <div className="flex items-start gap-4 rounded-[10px]">
    <div className="rounded-[10px] bg-[#DFEA6C] p-2 mt-1">
      <img src={Dvgenre} alt="" className="w-[30px]" />
    </div>
    <div>
      <h1 className="font-[Zain] font-bold text-[20px] leading-[16px] tracking-[0]">
        Diverse Genres
      </h1>
      <p className="font-[Zain] font-normal text-[14px] leading-[16px] tracking-[0] text-[#6A7282] mt-2">
        Find books across every category,<br /> from fantasy to finance.
      </p>
    </div>
  </div>

  {/* 2. Flexible Access */}
  <div className="flex items-start gap-4 rounded-[10px]">
    <div className="rounded-[10px] bg-[#DFEA6C] p-2 mt-1">
      <img src={flexicon} alt="" className="w-[30px]" />
    </div>
    <div>
      <h1 className="font-[Zain] font-bold text-[20px] leading-[16px] tracking-[0]">
        Flexible Access
      </h1>
      <p className="font-[Zain] font-normal text-[14px] leading-[16px] tracking-[0] text-[#6A7282] mt-2">
        Rent, buy, or subscribe —<br /> your choice, your pace.
      </p>
    </div>
  </div>

  {/* 3. Personalized Picks */}
  <div className="flex items-start gap-4 rounded-[10px]">
    <div className="rounded-[10px] bg-[#DFEA6C] p-2 mt-1">
      <img src={PP} alt="" className="w-[30px]" />
    </div>
    <div>
      <h1 className="font-[Zain] font-bold text-[20px] leading-[16px] tracking-[0]">
        Personalized Picks
      </h1>
      <p className="font-[Zain] font-normal text-[14px] leading-[16px] tracking-[0] text-[#6A7282] mt-2">
        Smart suggestions based<br /> on what you like.
      </p>
    </div>
  </div>

  {/* 4. Anytime, Anywhere */}
  <div className="flex items-start gap-4 rounded-[10px]">
    <div className="rounded-[10px] bg-[#DFEA6C] p-2 mt-1">
      <img src={clock} alt="" className="w-[30px]" />
    </div>
    <div>
      <h1 className="font-[Zain] font-bold text-[20px] leading-[16px] tracking-[0]">
        Anytime, Anywhere
      </h1>
      <p className="font-[Zain] font-normal text-[14px] leading-[16px] tracking-[0] text-[#6A7282] mt-2">
        Access your collection<br /> across devices.
      </p>
    </div>
  </div>
</div>

    
    </div>
   )
;}
export default WhyCompant;