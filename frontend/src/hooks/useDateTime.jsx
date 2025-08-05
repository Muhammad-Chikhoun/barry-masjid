import * as React from "react";
import { useEffect, useState } from "react";
import HijriDate from "hijri-date/lib/safe";

const useDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedGregorian = dateTime.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const monthOnly = dateTime.toLocaleString("en-GB", {month: "long"});

  // Hijri month names (Umm al-Qura style)
  const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabi' al-Awwal",
    "Rabi' al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qi'dah",
    "Dhu al-Hijjah"
  ];
  
  // Get today's Hijri date
  const todayHijri = new HijriDate();
  
  const day = todayHijri.getDate();
  const monthIndex = todayHijri.getMonth();
  const year = todayHijri.getFullYear();
  const monthName = hijriMonths[monthIndex-1];
  const formattedHijri = `${day} ${monthName} ${year}`

  const timeOnly = dateTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return { formattedGregorian, formattedHijri, timeOnly, monthOnly };
};

export default useDateTime;
