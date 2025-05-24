// prayers.jsx
// Timetable page for the Barry Masjid & Islamic Centre website

// To Do: Add actual timetable content and functionality
//        Add link to timetable PDf
//        Add the calendar ui thing and make it so you can see salaah times for the year easily cuz why not


import React from 'react';

export default function PrayerTimes() {

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
          </li>
        ))}
      </ul>
    </div>
  );
}
