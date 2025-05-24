import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import useDateTime from "../hooks/useDateTime";
import usePrayerTimes from "../hooks/usePrayerTimes";

const PRAYER_KEYS = [
  { key: "fajr", label: "Fajr" },
  { key: "dohr", label: "Zuhr" },
  { key: "asr", label: "Asr" },
  { key: "maghreb", label: "Maghrib" },
  { key: "icha", label: "Isha" },
];

// Optional static Jamaat times for comparison
const jamaatTimes = {
  fajr: "05:30",
  dohr: "13:15",
  asr: "17:00",
  maghreb: "19:05",
  icha: "20:45",
};

const getCurrentPrayer = (currentTime, times) => {
  const keys = Object.keys(times);
  let current = "";

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const nextKey = keys[i + 1];
    const thisTime = times[key];
    const nextTime = nextKey ? times[nextKey] : "23:59";

    if (!thisTime) continue;

    if (currentTime >= thisTime && currentTime < nextTime) {
      current = key;
      break;
    }
  }

  return current;
};

const Timetable = () => {
  const { prayers, error } = usePrayerTimes();
  const { timeOnly } = useDateTime();

  if (error) return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
  if (!prayers) return <p className="text-gray-500 text-center mt-4">Loading prayer times...</p>;

  const currentPrayer = getCurrentPrayer(timeOnly, jamaatTimes);

  return (
    <div className="overflow-x-auto text-black">
      <Table>
        <TableCaption>Today's Prayer Times</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            {PRAYER_KEYS.map(({ key, label }) => (
              <TableHead key={key}>{label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="font-semibold">Begins</TableCell>
            {PRAYER_KEYS.map(({ key }) => (
              <TableCell key={key}>{prayers[key] || "-"}</TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell className="font-semibold">Jamaat</TableCell>
            {PRAYER_KEYS.map(({ key }) => {
              const isCurrent = key === currentPrayer;
              const classes = isCurrent
                ? "bg-primary text-white font-semibold"
                : "";

              return (
                <TableCell key={key} className={classes}>
                  {jamaatTimes[key] || "-"}
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Timetable;
