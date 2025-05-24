import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_URL;

const usePrayerCalendarMonth = (masjidId, monthNumber) => {
  const [calendar, setCalendar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonth = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/${masjidId}/calendar/${monthNumber}`);
        if (!res.ok) throw new Error("Failed to fetch monthly calendar");

        const data = await res.json();
        setCalendar(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMonth();
  }, [masjidId, monthNumber]);

  return { calendar, error };
};

export default usePrayerCalendarMonth;
