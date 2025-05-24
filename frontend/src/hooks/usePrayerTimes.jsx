import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_URL;

const usePrayerTimes = () => {
  const [prayers, setPrayers] = useState(null);
  const [error, setError] = useState(null);

  // Helper to convert 24h time string to 12h format
  const to12Hour = (timeStr) => {
    if (!timeStr) return "";
    const [hourStr, minute] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/barry-masjid-wales-uk/prayer-times`);
        const contentType = res.headers.get("content-type");

        if (!res.ok) {
          if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            const message = errorData?.detail?.[0]?.msg || "Unexpected error occurred";
            throw new Error(message);
          } else {
            throw new Error("Failed to fetch prayer times");
          }
        }

        const data = await res.json();

        // Convert all time values to 12-hour format
        const formatted = Object.fromEntries(
          Object.entries(data).map(([key, value]) => [key, to12Hour(value)])
        );

        setPrayers(formatted);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPrayerTimes();
  }, []);

  return { prayers, error };
};

export default usePrayerTimes;
