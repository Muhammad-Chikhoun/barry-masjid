import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_URL;

const useRawPrayerData = (masjidId) => {
  const [raw, setRaw] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaw = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/${masjidId}/`);
        if (!res.ok) throw new Error("Failed to fetch raw prayer data");

        const data = await res.json();
        setRaw(data.rawdata);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRaw();
  }, [masjidId]);

  return { raw, error };
};

export default useRawPrayerData;
