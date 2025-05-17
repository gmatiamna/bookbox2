import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BuyButton = ({ to, label, className }) => {
  return (
    <Link
      to={to}
      className={`
        w-[68px] h-[28px] bg-[#C5922D]
        rounded-[4px] text-white 
        font-[400] text-[16px] leading-[100%]
        font-[Zain] inline-flex items-center justify-center
        ${className}
      `}
      style={{
        letterSpacing: "0%",
        verticalAlign: "bottom",
      }}
    >
      {label}
    </Link>
  );
};

BuyButton.defaultProps = {
  label: "Buy",
  className: "",
};

BuyButton.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default BuyButton;
