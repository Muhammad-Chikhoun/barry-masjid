import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_URL;

const useIqamaTimes = (monthNumber, dayNumber) => {
  const [prayers, setPrayers] = useState(null);
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
    const fetchIqamaTimes = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/barry-masjid-wales-uk`);
        if (!res.ok) throw new Error("Failed to fetch Iqama data");
        const data = await res.json();

        const rawIqama = data.rawdata?.iqamaCalendar?.[monthNumber - 1]?.[dayNumber];
        if (!rawIqama) throw new Error("Iqama data not found");

        const prayerKeys = ["fajr", "dohr", "asr", "maghreb", "icha"];
        const formatted = prayerKeys.reduce((acc, key, i) => {
          acc[key] = to12Hour(rawIqama[i]);
          return acc;
        }, {});

        setPrayers(formatted);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchIqamaTimes();
  }, [monthNumber, dayNumber]);

  return { prayers, error };
};

export default useIqamaTimes;
