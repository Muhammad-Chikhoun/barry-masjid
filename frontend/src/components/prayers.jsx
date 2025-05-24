import { useEffect, useState } from "react";

//ITS THE PAGE ON TIMETABLES, NEEDS TO BE FIXED BETTER TO MATCH OTHER STUFF

export default function PrayerTimes() {
  const [prayers, setPrayers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/v1/barry-masjid-wales-uk/prayer-times`);
        const contentType = res.headers.get("content-type");

        if (!res.ok) {
          if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            const message =
              errorData?.detail?.[0]?.msg || "Unexpected error occurred";
            throw new Error(message);
          } else {
            throw new Error("Failed to fetch prayer times");
          }
        }

        const data = await res.json();
        setPrayers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPrayerTimes();
  }, []);

  if (error) return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
  if (!prayers) return <p className="text-gray-500 text-center mt-4">Loading prayer times...</p>;

  // Map to desired display order and names
  const displayOrder = [
    { key: "fajr", label: "Fajr" },
    { key: "sunset", label: "Sunrise" },
    { key: "dohr", label: "zuhr" },  
    { key: "asr", label: "Asr" },
    { key: "maghreb", label: "Maghrib" },
    { key: "icha", label: "Isha" },
  ];

  return (
    <div className="bg-white text-black p-4 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Today's Prayer Times</h2>
      <ul className="space-y-2">
        {displayOrder.map(({ key, label }) => (
          <li key={key} className="flex justify-between border-b pb-1">
            <span>{label}</span>
            <span>{prayers[key]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
