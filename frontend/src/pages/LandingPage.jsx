
import React from "react";
import {Link} from "react-router-dom"
import logo from "../assets/Logo.svg"
import girlbook from "../assets/landing/girlbook 1.png"
import OfferSignUp from "../LandingComponts/OfferSignup";
import { useGetBestSellersQuery } from '../slices/bookApi'; // Import the API call
import BestSellerCard from '../LandingComponts/BestSellerCart';
import WelcomSlide from "../LandingComponts/WelcomeSlide";
import WhyCompant from  "../LandingComponts/WhyPartLanding";
import HowCompant from "../LandingComponts/HowPartlanding";
import BestRated from "../LandingComponts/BestRated"
import OfferTitle from "../OffersCompants/OffersTtile"
import Footer from "../components/Footer";
const LandingPage = () => {
   const { data: bestSellers, error, isLoading } = useGetBestSellersQuery();
   console.log("bestSellers", bestSellers);

   if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading best sellers</div>;
  return (
    <div >
     <div className="flex justify-between p-2">
        <img src={logo} alt="" 
        className="w-[42px]"/>
        <div className=" flex gap-4 w-[400px]">

          <Link to="/signup">
  <button className="w-[137px] pl-12 h-[42px]  rounded-[20px] bg-[#9FB11D] text-white font-[Zain] font-bold text-[16px] leading-[100%] tracking-[0px] text-center align-middle">
  Sign Up
</button>
</Link>
 <Link to="/login">
<button className="w-[137px] pl-12 h-[42px]  rounded-[20px] bg-[#885520] text-white font-[Zain] font-bold text-[16px] leading-[100%] tracking-[0px] text-center align-middle">
  Sign In
</button>
</Link>

        </div>
     </div>
     <div className="flex gap-4"> <OfferSignUp/>
     
        {bestSellers.map(book => (
  <BestSellerCard key={book._id} book={book} />
))}</div>
    <WelcomSlide/>
     <WhyCompant/>
     <HowCompant/>
     <BestRated/>
     <div className="w-[70%] mx-auto flex justify-between"><div className="grid gap-4">
      <h1 className="text-[#00BAC7] font-[zain] font-extrabold text-[128px]">Rent</h1>
      <h2 className="text-[#000000] font-[zain] font-extrabold text-[64px]">the Stories You Love</h2>
      <p  className="text-[#000000] font-[zain] font-400 text-[32px]">Enjoy full access to the books you want — without the full price.<br/>
        With flexible rentals, you can read on your terms and return when youre done.<br/>
        Perfect for trying new titles or diving into short reads.</p>
        <button className="text-white font-[zain] font-400 text-[24px] bg-[#00BAC7] rounded-[10px] p-4 w-[150px]">Start Renting</button>
     </div>
     <img src={girlbook} alt="" />
     </div>
     
     <OfferTitle/>
     <Footer/>
    </div>
  );
};

export default LandingPage;
