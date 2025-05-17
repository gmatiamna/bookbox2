import React from "react"; 
import LoginForm from "../LoginComponts/LoginForm";
import path1 from '../assets/Path00.svg';
import path2 from '../assets/Path 21.svg';
import path3 from '../assets/Path 22.svg';
import path4 from '../assets/Path 23.svg';
import path11 from '../assets/Path 15.svg';
import path12 from '../assets/Path 16.svg';
import path13 from '../assets/Path 17.svg';
import path14 from '../assets/Path 18.svg';
import bgimg from "../assets/backgroundLogin 2.svg"
import logo from "../assets/Logo.svg"
const LoginPage = () => {
  
return(
  <div className="w-full relative">

<img src={logo} alt="" className="w-[42px] h-[47px] absolute top-[20px] left-[36px] z-10" />
   <img src={bgimg} alt="" className=" w-[40%] absolute top-[140px] right-[600px] z-10"/>
    <div className="relative ">
<img src={path1} className="absolute top-[583px] right-0 z-[4]" />
<img src={path2} className="absolute top-[481px] right-0 z-[3]" />
<img src={path3} className="absolute top-[386px] right-0 z-[2]" />
<img src={path4} className="absolute top-[280px] right-0 z-[1]" />

 
</div>
<div className="relative ">
  <img src={path11} className="absolute top-[0] left-0 z-[4]" />
  <img src={path12} className="absolute top-[0] left-[-0.3px] z-[3]" />
  <img src={path13} className="absolute top-[0.79px] left-[-0.3px] z-[2]" />
  <img src={path14} className="absolute top-[0.3px] left-[-0.1px] z-[1]" /> 
 
</div>
<p className=" w-[40%] absolute top-[550px] right-[650px] font-[Zain] font-[600] text-[30px] ">Enter Your
   <em className="text-[#875520]">BookBox .</em>  <br />
Your world of stories,
one login away.
</p>

<h1 className="font-[Zain] font-[700] text-[24px] absolute top-[140px] right-[290px]"> <em className="text-[#875520]">Login </em>your account</h1>
  <LoginForm/></div>

)
};

export default LoginPage;
