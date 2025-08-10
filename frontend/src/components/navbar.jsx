// navbar.jsx
// navbar for the Barry Masjid & Islamic Centre website
// Contains navigation links and tab content
// Uses lucide-react icons for mobile menu toggle

// TO DO: Add actual content for each tab as needed

import * as React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import Home from "../pages/home";
import MainTable from "./mainTable";
import Dev from "./dev"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const navLinks = [
    { name: "Home" },
    { name: "Timetable" },
    { name: "Live" },
    { name: "Donate" },
    { name: "Madrassah" },
    { name: "Contact" },
  ];

  return (
    <>
      <nav className="bg-primary shadow-xl w-full">
        <div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button className="flex flex-row mx-auto" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-10 text-md py-3 justify-center">
            {navLinks.map(({ name }) => (
              <button
                key={name}
                onClick={() => setActiveTab(name)}
                className={`hover:text-primary hover:bg-white hover:px-2.5 transition-all ${
                  activeTab === name ? "text-primary bg-white px-5 font-bold" : "text-white"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 text-center">
            {navLinks.map(({ name }) => (
              <button
                key={name}
                onClick={() => {setActiveTab(name)}}
                className={`block w-full hover:text-accent-foreground transition-all ${
                  activeTab === name ? "text-primary bg-white" : "text-white"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Tab content */}
      <div>
        {activeTab === "Home" && <Home />}
        {activeTab === "Timetable" && <MainTable />}
        {activeTab === "Live" && <Dev />}
        {activeTab === "Donate" && <Dev />}
        {activeTab === "Madrassah" && <Dev />}
        {activeTab === "Contact" && <Dev />}
      </div>
    </>
  );
};

export default Navbar;
