// footer.jsx
// Footer for the Barry Masjid & Islamic Centre website
// Contains site information and links

// TO DO: Add actual links and content as needed

import * as React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#d9d7d3] py-8 text-black inset-x-0 bottom-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          {/* Site Info */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold">Barry Masjid & Islamic Centre</h2>
            <p className="text-sm mt-2">© {new Date().getFullYear()} All rights reserved.</p>
          </div>

          {/* Links */}
          <div className="flex flex-col text-center md:flex-row gap-4 text-sm">
            <a href="#" className="hover:text-white transition">About</a>
            <a href="#" className="hover:text-white transition">Contact</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
