import React from "react";

import { motion } from "framer-motion";
import SigngreenText from "../SignupComponets/Signupgrentext";
import SignupForm from "../SignupComponets/SignupForm";
import signupgreen from "../assets/signup green.svg"
import logo from "../assets/Logo.svg"
import instaicon from "../assets/instagram-icon.svg"
const SignupPage = () => {

  return (
    <div className="relative">
<img src={logo} alt="" className="w-[42px] h-[47px] absolute top-[20px] left-[36px]" />
<h5 className=" absolute top-[20px] left-[334px] font-[Zain] font-[400]">already have acount? <a href="" className="text-[#9FB11D] font-zain font-[800]">  Log In</a></h5>
       <SignupForm />
<img src={instaicon} alt="" className="absolute top-[581px] left-[158px]"/>
<motion.img
  src={signupgreen}
  alt="Signup Illustration"
  className="absolute top-0 right-0 max-sm:w-full"
  initial={{ opacity: 0, x: 100 }}           // Start 100px to the right
  whileInView={{ opacity: 1, x: 0 }}         // Animate to original position
  transition={{ type: "spring", bounce: 0.4, duration: 2 }}
/>
  <SigngreenText position="top-right" className="opacity-80" />
</div>
   
  );
};

export default SignupPage;
