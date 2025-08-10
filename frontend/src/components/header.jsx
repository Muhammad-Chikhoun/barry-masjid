// header.jsx
// displays logo, title, and current date/time in both Gregorian and Hijri formats

import * as React from "react";
import useDateTime from "../hooks/useDateTime";

const Header = () => {
    const { formattedGregorian, formattedHijri} = useDateTime();
    
    return (
      <header className="bg-primary py-4">
        <div className="flex items-center justify-between px-4">
          {/* Logo */}
          <img src="barry.png" className="w-15 md:w-30" alt="Barry Logo" />
  
          {/* Title */}
          <h1 className="text-center text-white text-lg font-bold md:text-6xl mx-auto">
            Barry Masjid
          </h1>
  
          {/* Date & Time */}
          <div className="text-white text-xs md:text-sm text-right w-15 md:w-30 leading-tight">
            <div className="text-[9px] md:text-xs">{formattedHijri}</div>
            <div className="text-[9px] md:text-xs opacity-80">{formattedGregorian}</div>
          </div>
        </div>
      </header>
    );
  };  

export default Header;
