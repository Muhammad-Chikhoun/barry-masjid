// timetable.jsx
// timetable component for home page
// To do: use api to get right times
//        also add function to work out most current salaah

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";

import { fullDay } from "@/hooks/useData";
import useDateTime from "@/hooks/useDateTime";

const Timetable = () => {
  const { monthNum, dateOnly } = useDateTime();
  const [currentDate] = React.useState(dateOnly);
  const times = fullDay(monthNum, parseInt(currentDate));

  const headings = [
    "Suhoor<br />End",
    "Fajr",
    "Sunrise",
    "Zawaal",
    "Zuhr",
    "Asr",
    "Maghrib",
    "Isha",
  ];

  const beginsTimes = times.slice(0, 8);
  const jamaatTimes = [
    "-",            // Suhoor
    times[8],       // Fajr Jamaat
    "-",            // Sunrise
    "-",            // Zawaal
    times[9],       // Zuhr Jamaat
    times[10],      // Asr Jamaat
    times[11],      // Maghrib Jamaat
    times[12],      // Isha Jamaat
  ];

  return (
    <div className="overflow-y-auto text-black px-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4 mb-8">

        
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-xl md:text-3xl font-bold text-center text-primary">
          Today's Salah Times
        </h1>
        <Button onClick={() => setActiveTab("Timetable")}>
          View Full Timetable
        </Button>
      </div>

        {/* Table */}
        <Table className="w-fit text-center text-[12px] border">
          <TableHeader>
            <TableRow className="border-b border-black">
              <TableHead className="text-center text-[10px] md:text-sm"></TableHead>
              {headings.map((heading, index) => (
                <TableHead
                  key={index}
                  className="text-center text-[10px] md:text-sm"
                  dangerouslySetInnerHTML={{ __html: heading }}
                />
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableHead className="text-center text-[10px] md:text-sm">Begins</TableHead>
              {beginsTimes.map((time, index) => (
                <TableCell key={index}>{time}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableHead className="text-center text-[10px] md:text-sm">Jam'aat</TableHead>
              {jamaatTimes.map((time, index) => (
                <TableCell key={index}>{time}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Timetable;
