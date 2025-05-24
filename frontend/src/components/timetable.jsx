// timetable.jsx
// timetable component for home page
// To do: use api to get right times
//        also add function to work out most current salaah

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


const PRAYER_KEYS = [
  { key: "fajr", label: "Fajr" },
  { key: "dohr", label: "Zuhr" },
  { key: "asr", label: "Asr" },
  { key: "maghreb", label: "Maghrib" },
  { key: "icha", label: "Isha" },
];

const jamaatTimes = {
  fajr: "05:30",
  dohr: "13:15",
  asr: "17:00",
  maghreb: "19:05",
  icha: "20:45",
};

const prayers = {
  fajr: "05:30",
  dohr: "13:15",
  asr: "17:00",
  maghreb: "19:05",
  icha: "20:45",
};

const Timetable = () => {

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
            <TableCell className="font-semibold">Begins</TableCell>
            {PRAYER_KEYS.map(({ key }) => (
              <TableCell key={key}>{jamaatTimes[key] || "-"}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Timetable;
