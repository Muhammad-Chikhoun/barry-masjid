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
import { useNavigate } from "react-router-dom";

const Timetable = () => {
  const { monthNum, dateOnly } = useDateTime();
  const [currentDate] = React.useState(dateOnly);
  const times = fullDay(monthNum, parseInt(currentDate));
  const navigate = useNavigate();

  const headings = [
    "Fajr",
    "Zuhr",
    "Asr",
    "Maghrib",
    "Isha",
  ];

  const beginsTimes = [
    times[1],
    times[4],
    times[5],
    times[7],
    times[8]
  ]
  const jamaatTimes = times.slice(9,14)
 
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center gap-5 py-10 md:ml-22 text-black ">

        
      <div className="flex flex-col">
        <h1 className="text-xl md:text-3xl font-bold text-center text-primary">
          Today's Salah Times
        </h1>
        <Button onClick={() => navigate("/timetable")}>
          View Full Timetable
        </Button>
      </div>

        <Table className="w-fit text-center text-[12px] border">
          <TableHeader>
            <TableRow className="border-b border-black">
              <TableHead className="text-center text-[10px] md:text-sm border-r border-black"></TableHead>
              {headings.map((heading, index) => (
                <TableHead
                  key={index}
                  className="text-center text-[10px] md:text-sm"
                  >{heading}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableHead className="text-center text-[10px] md:text-sm border-r border-black">Begins</TableHead>
              {beginsTimes.map((time, index) => (
                <TableCell key={index}>{time}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableHead className="text-center text-[10px] md:text-sm border-r border-black">Jam'aat</TableHead>
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
