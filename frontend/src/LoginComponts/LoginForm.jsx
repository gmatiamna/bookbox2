import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/userApi";
import { setCredentials } from "../slices/authslice";
import { useDispatch } from "react-redux";
import "../styles/signupbuttonstyle.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error

    try {
      const user = await login({ email, mot_de_passe }).unwrap();
      dispatch(setCredentials(user));
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div
      className="absolute w-[256px] h-[336px] top-[200px] right-[250px] bg-gray p-6 z-[100]"
      style={{ boxShadow: "5px 10px 50px 0px #00000029" }}
    >
      <form onSubmit={handleSubmit} className="space-y-6 mt-10">
        <div className="relative mb-4 border-b border-gray-300 flex items-center">
          <label htmlFor="email" className="block font-semibold mb-6">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 placeholder-gray-500 bg-transparent border-none focus:outline-none focus:ring-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative mb-4 border-b border-gray-300 flex items-center">
          <label htmlFor="mot_de_passe" className="block font-semibold mb-6">
            Password
          </label>
          <input
            type="password"
            id="mot_de_passe"
            className="w-full px-4 py-2 placeholder-gray-500 bg-transparent border-none focus:outline-none focus:ring-0"
            value={mot_de_passe}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <a href="#" className="text-[#885520] font-[700] ml-16">
          Forget password?
        </a>

        <button
          type="submit"
          disabled={isLoading}
          className="w-[157px] p-2 bg-[#885520] text-white pl-10 ml-6"
        >
          {isLoading ? "Logging in..." : "Login"}
          <div className="arrow-wrapper">
            <div className="arrow"></div>
          </div>
        </button>

        <a href="/signup" className="text-[#885520] ml-16">
          Sign up
        </a>
      </form>
    </div>
  );
};

export default LoginForm;
