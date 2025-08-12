//useDateTime.jsx
//hook for all things date and time related

import { useEffect, useState } from "react";
import HijriDate from "hijri-date";

const useDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
    setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //indexes for days and months to get Islamic
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const hijriMonths = ["Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const hijriDays = ["Al-ithnayn", "Ath-thulathaa", "Al-arbi'aa", "Al-khamees", "Al-jumu'ah", "As-sabt", "Al-Ahad"]

  //other variables to work out date
  const weekday = dateTime.toLocaleDateString("en-GB", {weekday: "long",})
  const monthOnly = dateTime.toLocaleString("en-GB", {month: "long"});

  //variables for full Hijri date
  const todayHijri = new HijriDate();
  const hDate = todayHijri.getDate();
  const monthIndex = todayHijri.getMonth();
  const year = todayHijri.getFullYear();
  const hDay = hijriDays[days.indexOf(weekday)];
  const monthName = hijriMonths[monthIndex-1];


  //exports
  const dateOnly = dateTime.toLocaleString("en-GB", {day: "2-digit"});
  const monthNum = months.indexOf(monthOnly);
  const formattedHijri = `${hDay} ${hDate} ${monthName} ${year}`

  const formattedGregorian = dateTime.toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = dateTime.toLocaleDateString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })

  return { dateOnly, monthNum, formattedGregorian, formattedHijri, time, months };
};

export default useDateTime;
