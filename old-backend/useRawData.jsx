// hooks/useMasjidData.js
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

export default function useMasjidData() {
  const [masjidData, setMasjidData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMasjidData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/barry-masjid-wales-uk`);
        if (!res.ok) throw new Error("Failed to fetch masjid data");
        const json = await res.json();
        setMasjidData(json);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMasjidData();
  }, []);

  return { masjidData, error };
}
