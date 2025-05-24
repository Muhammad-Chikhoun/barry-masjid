import * as React from "react";
import { useEffect, useState } from "react";

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
    hour12: false,
  });

  const formattedHijri = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dateTime);

  const timeOnly = dateTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });  

  return { formattedGregorian, formattedHijri, timeOnly };
};

export default useDateTime;
