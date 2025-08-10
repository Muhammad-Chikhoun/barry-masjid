// Hook to access today's prayer times

import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

const usePrayerTimes = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const to12Hour = (timeStr) => {
    if (!timeStr) return "";
    const [hourStr, minute] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/barry-masjid-wales-uk/prayer-times`);
        const contentType = res.headers.get("content-type");

        if (!res.ok) {
          if (contentType?.includes("application/json")) {
            const errorData = await res.json();
            const message = errorData?.detail?.[0]?.msg || "Unexpected error occurred";
            throw new Error(message);
          } else {
            throw new Error("Failed to fetch data");
          }
        }

        const result = await res.json();

        const formatted = Object.fromEntries(
          Object.entries(result).map(([key, value]) => [key, to12Hour(value)])
        );

        setData(formatted);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return { data, error };
};

export default usePrayerTimes;
