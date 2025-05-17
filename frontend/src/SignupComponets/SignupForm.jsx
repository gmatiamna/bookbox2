import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../slices/userApi";
import { setCredentials } from "../slices/authslice";
import signimg from "../assets/signup design.svg";
import namesign from "../assets/username-icon.svg";
import emailicon from "../assets/email-icon.svg";
import passwordicon from "../assets/password-icon.svg";
import dbicon from "../assets/datebirth-icon.svg";
import approved from "../assets/approved.svg";
import rejected from "../assets/rejected.svg";
import "../styles/signupbuttonstyle.css";
import SignupToGenreTransition  from "./SignupTogenreAn";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    d_ness: "",
    mot_de_passe: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const [showTransition, setShowTransition] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedForm);

    if (name === "mot_de_passe" || name === "confirmPassword") {
      setPasswordMatch(updatedForm.mot_de_passe === updatedForm.confirmPassword);
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordMatch) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userData = await signup(formData).unwrap();
      dispatch(setCredentials(userData.user));
      alert(userData.message);
      setShowTransition(true); 
      setTimeout(() => {
        navigate("/genreupdate");
      }, 4000); // Delay (2s) to match animation
    } catch (err) {
      setError(err?.data?.message || "Something went wrong!");
    }
  };
  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const isStrongPassword = (password) => password.length >= 6;
  if (showTransition) {
    return <SignupToGenreTransition />;
  }
  return (
    <div className="w-[30%]   mt-[144px] ml-[164px] absolute">
      <div className="flex justify-between">
        <div>
          <h2 className="font-[Zain] font-extrabold text-[52px] leading-[100%] tracking-[5%] text-black">
            Sign Up
          </h2>
          <p className="font-[Zain] font-normal text-[14px] leading-[100%] tracking-[0%] text-[#6A7282]">
            Start your journey with BookBox. Sign up and start exploring!
          </p>
        </div>
        <img src={signimg} alt="signimg" />
      </div>

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="relative mb-4 border-b border-gray-300 flex items-center">
          <img src={namesign} alt="username-icon" />
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full px-4 py-2 placeholder-gray-500 bg-transparent border-none focus:outline-none focus:ring-0"
            placeholder="Username"
            required
          />
          {formData.nom.length > 0 && (
            <img
              src={formData.nom.length >= 2 ? approved : rejected}
              alt="validation"
              className="w-5 h-5 ml-2"
            />
          )}
        </div>

        {/* Email */}
        <div className="relative mb-4 border-b border-gray-300 flex items-center">
          <img src={emailicon} alt="email-icon" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 placeholder-gray-500 bg-transparent border-none focus:outline-none focus:ring-0"
            placeholder="UserEmail"
            required
          />
          {formData.email.length > 0 && (
            <img
              src={isValidEmail(formData.email) ? approved : rejected}
              alt="validation"
              className="w-5 h-5 ml-2"
            />
          )}
        </div>

        {/* Date of birth */}
        <div className="relative mb-4 border-b border-gray-300 flex items-center">
          <img src={dbicon} alt="dob-icon" />
          <input
            type="date"
            name="d_ness"
            value={formData.d_ness}
            onChange={handleChange}
            className="w-full px-4 py-2 placeholder-gray-500 bg-transparent border-none focus:outline-none focus:ring-0"
            required
          />
          {formData.d_ness.length > 0 && (
            <img
              src={formData.d_ness ? approved : rejected}
              alt="validation"
              className="w-5 h-5 ml-2"
            />
          )}
        </div>

        {/* Password */}
        <div className="relative mb-4 border-b border-gray-300 flex items-center">
          <img src={passwordicon} alt="password-icon" />
          <input
            type="password"
            name="mot_de_passe"
            value={formData.mot_de_passe}
            onChange={handleChange}
            className="w-full px-4 py-2 placeholder-gray-500 bg-transparent border-none focus:outline-none focus:ring-0"
            placeholder="Password"
            required
          />
          {formData.mot_de_passe.length > 0 && (
            <img
              src={isStrongPassword(formData.mot_de_passe) ? approved : rejected}
              alt="validation"
              className="w-5 h-5 ml-2"
            />
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative mb-4 border-b border-gray-300 flex items-center">
          <img src={passwordicon} alt="confirm-password-icon" />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 placeholder-gray-500 bg-transparent border-none focus:outline-none focus:ring-0"
            placeholder="Verify Password"
            required
          />
          {formData.confirmPassword.length > 0 && (
            <img
              src={formData.mot_de_passe === formData.confirmPassword ? approved : rejected}
              alt="validation"
              className="w-5 h-5 ml-2"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-[157px] p-2 bg-[#9FB11D] text-white pl-10"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
          <div className="arrow-wrapper">
            <div className="arrow"></div>
          </div>
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {!passwordMatch && (
          <p style={{ color: "red" }}>Passwords do not match.</p>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
