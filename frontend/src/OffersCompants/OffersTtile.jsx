import React from "react";
import SubscriptionPlans from "./SubscriptionPlans";
const OffersTitle = () => {
  return (
    <div
      className="mx-auto  mt-24 p-28"
      style={{
        clipPath: 'polygon(0 9%, 100% 0, 100% 91%, 0% 100%)',
        background: '#00BAC7',
        borderTopRightRadius: '30px',
        borderBottomLeftRadius: '30px',
      }}
    >
      <h1
        className="w-[120px] h-[42px] font-[400] text-[16px] mx-auto text-white leading-[100%] rounded-full px-[20px] py-[10px] flex items-center justify-center"
        style={{
          background: '#335B6B80',
          fontFamily: 'Zain',
          letterSpacing: '10%',
        }}
      >
        OUR PLANS
      </h1>

      <p
        className="text-white text-[20px] font-[400] text-center mt-4"
        style={{
          fontFamily: 'Zain',
        }}
      >
        You can rent, buy, or subscribe to e-books through BookBox,
        <br />
        and use points to get additional benefits.
      </p>

      <p
        className="text-[#FFFFFFCC] text-[16px] font-[400] text-center mt-2"
        style={{
          fontFamily: 'Zain',
        }}
      >
        Selling or reproducing without the authors permission is prohibited.
        Copyright is protected by law.
      </p>
<SubscriptionPlans/>
<p  className="text-white text-[18px] font-[400] text-center mt-4"
        style={{
          fontFamily: 'Zain',
        }}>E-books are instantly available on BookBox after you purchase, subscribe, or rent<br/>
All content is copyright-protected and owned by BookBox</p>
    </div>
  );
};

export default OffersTitle;
