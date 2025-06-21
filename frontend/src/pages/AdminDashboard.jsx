// src/pages/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-[#F2E8DC] min-h-screen">
      <h1 className="text-4xl font-bold text-[#724521] mb-10 text-center">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link
          to="/admin/add-book"
          className="bg-[#9FB11D] hover:bg-[#7C9715] text-white font-semibold py-5 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
        >
          Add New Book
        </Link>

        <Link
          to="/admin/books"
          className="bg-[#40879A] hover:bg-[#306671] text-white font-semibold py-5 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
        >
          Book List
        </Link>

        <Link
          to="/admin/add-plan"
          className="bg-[#724521] hover:bg-[#5b361a] text-white font-semibold py-5 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
        >
          Add Subscription Plan
        </Link>

        <Link
          to="/admin/plans"
          className="bg-[#A26A3F] hover:bg-[#8b5631] text-white font-semibold py-5 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
        >
          Subscription Plans List
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
