import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import circle from "../assets/Ellipse 1.png";
import poly from "../assets/Polygon 1.svg";
import polyblue from "../assets/Polygon blue.png";
import rec from "../assets/Rectangle 5.svg";
import reblue from "../assets/Rectangle blue.png";
import recgreen from "../assets/Rectangle green.png"; // Add your new image here

const ServicesSlider = () => {
  const [currentService, setCurrentService] = useState(1);

  const handleNext = () => {
    setCurrentService(currentService + 1);
  };

  const handlePrevious = () => {
    setCurrentService(currentService - 1);
  };

  return (
    <div className="relative w-full  overflow-hidden h-[600px]">
      <AnimatePresence mode="wait">
        {currentService === 1 && (
          <motion.div
            key="service1"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", mass: 1, stiffness: 100, damping: 15 }}
            className="rounded-[20px] bg-[#885520] w-[70%] mt-[150px] ml-[200px] p-10 absolute"
          >
            {/* Service 1 content */}
            <img src={circle} alt="" className="absolute right-0 top-0" />
            <img src={poly} alt="" className="absolute right-[100px] top-[80px]" />
            <img src={rec} alt="" className="absolute right-[230px] top-[10px]" />
            <img src={rec} alt="" className="absolute right-[140px] top-[10px]" />
            <h1 className="text-[52px] font-[700] text-[#DFC165] font-[Zain] leading-[100%]">
              🛒 Buy Books
            </h1>
            <h2 className="text-[32px] font-[700] text-[#DFC165] font-[Zain] leading-[100%]">
              Own it forever.
            </h2>
            <p className="text-white font-[Zain] text-[24px] leading-[24px] font-normal">
              Download and revisit them anytime.<br />
              Earn the highest number of points per purchase.<br />
              Perfect for collectors and frequent readers.<br />
              Enjoy full-quality access with no time limits.<br />
              Every book you buy builds your digital shelf.
            </p>
            <motion.button
              onClick={handleNext}
              whileTap={{ scale: 0.95 }}
              className="bg-[#DFC165] rounded-[40px] px-10 py-3 text-black font-semibold absolute right-10 bottom-8"
            >
              NEXT
            </motion.button>
          </motion.div>
        )}
        {currentService === 2 && (
          <motion.div
            key="service2"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", mass: 1, stiffness: 100, damping: 15 }}
            className="rounded-[20px] bg-[#00BAC7] w-[70%] mt-[150px] ml-[200px] p-10 absolute"
          >
            {/* Service 2 content */}
            <img src={circle} alt="" className="absolute right-0 top-0" />
            <img src={polyblue} alt="" className="absolute right-[100px] top-[80px]" />
            <img src={reblue} alt="" className="absolute right-[230px] top-[10px]" />
            <img src={reblue} alt="" className="absolute right-[140px] top-[10px]" />
            <h1 className="text-[52px] font-[700] text-[#125B67] font-[Zain] leading-[100%]">
              📚 Rent Books
            </h1>
            <h2 className="text-[32px] font-[700] text-[#125B67] font-[Zain] leading-[100%]">
              Access affordably.
            </h2>
            <p className="text-white font-[Zain] text-[24px] leading-[24px] font-normal">
              Borrow books for a limited time.<br />
              Save money on short-term reads.<br />
              Ideal for students and casual readers.<br />
              Automatic returns at rental expiry.<br />
              Keep your shelf light and rotating.
            </p>
            <motion.button
              onClick={handlePrevious}
              whileTap={{ scale: 0.95 }}
              className="bg-[#125B67] rounded-[40px] px-10 py-3 text-black font-semibold absolute right-[170px] bottom-8"
            >
              Before
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileTap={{ scale: 0.95 }}
              className="bg-[#125B67] rounded-[40px] px-10 py-3 text-black font-semibold absolute right-10 bottom-8"
            >
              NEXT
            </motion.button>
          </motion.div>
        )}
        {currentService === 3 && (
          <motion.div
            key="service3"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", mass: 1, stiffness: 100, damping: 15 }}
            className="rounded-[20px] bg-[#9FB11D] w-[70%] mt-[150px] ml-[200px] ml-10 p-10 absolute"
          >
            {/* Service 3 content */}
            <img src={circle} alt="" className="absolute right-0 top-0" />
            <img src={polyblue} alt="" className="absolute right-[100px] top-[80px]" />
            <img src={recgreen} alt="" className="absolute right-[230px] top-[10px]" />
            <img src={recgreen} alt="" className="absolute right-[140px] top-[10px]" />
            <h1 className="text-[52px] font-[700] text-[#525E16] font-[Zain] leading-[100%]">
            Subscribe
            </h1>
            <h2 className="text-[32px] font-[700] text-[#525E16] font-[Zain] leading-[100%]">
            Unlimited access.
            </h2>
            <p className="text-white font-[Zain] text-[24px] leading-[24px] font-normal">
  No limits on how much or what you read.<br />
  Zero extra cost per book — it&apos;s all included.<br />
  Perfect for avid, daily readers on a budget.<br />
  Skip renting or buying, just explore freely.<br />
  One subscription, endless possibilities.
</p>
            <motion.button
              onClick={handlePrevious}
              whileTap={{ scale: 0.95 }}
              className="bg-[#125B67] rounded-[40px] px-10 py-3 text-black font-semibold absolute right-10 bottom-8"
            >
              Before
            </motion.button>
           
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesSlider;
