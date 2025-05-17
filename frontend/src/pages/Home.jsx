import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Nav from "../components/nav";

import Booklover from "../assets/BookLover.svg";
import GirlReading from "../assets/girlReading.svg";
import ExploreButton from "../buttons/ExploreButton";
import PapularGenre from "../HomeComponets/PapularGenre";

import PapularBook from "../HomeComponets/PapularBook";

import NewBooks from "../HomeComponets/NewBook";
import NewBookA from "../HomeComponets/NewBookA";



const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
 
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Nav />

      <div className="w-[90%] h-[208px] mt-[134px] rounded-[20px] bg-white shadow-[ -4px_4px_16px_#C4912D1A] mx-auto flex items-center justify-between mt-10 border">
        <img src={Booklover} alt="Decorative design" className="h-auto mb-20 ml-32" />

        <div className="flex-1px-4 w-[679px]">
          <h1 className="text-[32px] font-extrabold text-[#C5922D] leading-[100%] tracking-[0] align-bottom font-[Zain] mb-4">
            Every Book Holds a Universe. What Will You Discover Today?
          </h1>

          <p className="text-[20px] font-normal leading-[20px] tracking-[0] align-bottom font-[Zain] mb-4">
            Between every cover lies a world unseen — a place where time bends, voices speak louder,
            and your imagination takes the lead. At BookBox, we don’t just offer books. We open doors
            to journeys untold, waiting for someone like you to begin them.
          </p>

          <ExploreButton to="/library" label="Explore" className="bg-[#724521] text-white" />
        </div>

        <img src={GirlReading} alt="Decorative design" className="h-auto mt-16" />
      </div>
        < PapularGenre/>
     
                 <PapularBook/>
                 <NewBooks/>
           <NewBookA videoId={"nw59Nt5Hqhc"}/>
    
    </div>
  );
};

export default Home;
