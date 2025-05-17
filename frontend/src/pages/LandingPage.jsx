
import React from "react";
import {Link} from "react-router-dom"
import logo from "../assets/Logo.svg"
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
     <OfferTitle/>
     <Footer/>
    </div>
  );
};

export default LandingPage;
