import * as React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import Home from "./home";
import PrayerTimes from "./prayers";

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
                className={`hover:text-accent-foreground transition-colors ${
                  activeTab === name ? "text-black" : "text-white"
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
                className={`block w-full hover:text-accent-foreground transition-colors ${
                  activeTab === name ? "text-black" : "text-white"
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
        {activeTab === "Timetable" && <PrayerTimes />}
        {activeTab === "Live" && <p>Live streaming info goes here.</p>}
        {activeTab === "Donate" && <p>Donation options and forms here.</p>}
        {activeTab === "Madrassah" && <p>About the Madrassah program.</p>}
        {activeTab === "Contact" && <p>Contact us via this section.</p>}
      </div>
    </>
  );
};

export default Navbar;
