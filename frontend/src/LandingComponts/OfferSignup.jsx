import React from "react";
import girlbooks from "../assets/image 95.png"
const OfferSignUp = () => {
  return (
    <div className="relative bg-[#AA7324] rounded-xl  w-[70%] p-14 flex flex-col   h-[500px] justify-between overflow-hidden ml-20">
    
      <div className="relative z-10  space-y-4 ">
        <p className="text-[24px] leading-[16px] uppercase tracking-normal font-[700] text-[#DFC165] font-zain">
  READ MORE, PAY LESS
</p>

       <h2 className="text-[60px] leading-[100%] font-bold tracking-[0] text-[#CCDC3F] font-zain">
  Special 50% off
</h2>

     <p className="text-[52px] leading-[100%] font-light tracking-[0] text-white font-zain">
  for your first subscription
</p>

        <p className="text-[24px] leading-[24px] tracking-[0] font-normal text-white font-zain">
  Join BookBox today and enjoy half off your first month<br/> of unlimited book access. <br />
  <span className="font-semibold">Limited-time offer. Don’t miss it!</span>
</p>

        <div className="flex flex-wrap space-x-4">

          <button className="bg-[#DCF763] hover:bg-[#CCDC3F] text-[#677615] px-4 py-2 rounded-md transition">
            Get it now →
          </button>
          <button className="border border-[#CCDC3F] text-[#CCDC3F] px-4 py-2 rounded-md transition hover:bg-[#ccdc3f1a]">
            See other options
          </button>
        </div>
      </div>

      
        <div className="absolute w-[401px] h-[279px] -top-20 -right-24 opacity-30 bg-[#D5A83A]  shadow-[0px_8px_24px_0px_#00000040] z-0"
       style={{
    borderRadius: "52% 48% 50% 50% / 30% 32% 68% 70%  ",
  }}></div>

      <div className="absolute w-[250px] h-[250px] bottom-[-60px] right-[250px] bg-[#724521] opacity-20 rounded-full z-0"
      
></div>
  <img
          src={girlbooks}
          alt="Girl holding books"
          className="max-h-[421px] object-contain absolute z-10 bottom-[0px] right-[0]"
        />
   
      
     
    </div>
  );
};

export default OfferSignUp;
