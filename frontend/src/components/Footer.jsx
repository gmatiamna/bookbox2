import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#f9f4ef] text-[#724521] mt-12 border-t border-[#d4c4b0]">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">

        {/* About Section */}
        <div>
          <h3 className="font-semibold text-lg mb-3">BookBox</h3>
          <p className="leading-relaxed text-sm">
            A sanctuary for readers. Discover, rent, and own the books that move you.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="font-medium text-md mb-3">Explore</h4>
          <ul className="space-y-2">
            <li><a href="/library" className="hover:underline">Library</a></li>
            <li><a href="/offers" className="hover:underline">Offers</a></li>
            <li><a href="/subscriptions" className="hover:underline">Subscriptions</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="sm:col-span-2 md:col-span-2">
          <h4 className="font-medium text-md mb-3">Subscribe to our newsletter</h4>
          <p className="text-sm mb-4">Get the latest book releases and exclusive offers directly in your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-[#d4c4b0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#724521]"
            />
            <button
              type="submit"
              className="bg-[#724521] text-white px-5 py-2 rounded-md hover:bg-[#5e3719] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center text-xs text-[#9e8b77] py-4 border-t border-[#e1d3c2]">
        © {new Date().getFullYear()} BookBox. All rights reserved.
      </div>
    </footer>
  );
}
