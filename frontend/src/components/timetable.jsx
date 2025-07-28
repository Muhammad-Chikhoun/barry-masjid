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

import { fullBegin } from "@/hooks/useData";
import { fullJamat } from "@/hooks/useData";


const jamaatTimes = fullJamat(4,25)
const prayers = fullBegin(4,25)

const Timetable = () => {

  return (
    <div className="overflow-x-auto text-black">
      <Table>
        <TableCaption>Today's Prayer Times</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Fajr</TableHead>
            <TableHead>Zuhr</TableHead>
            <TableHead>Asr</TableHead>
            <TableHead>Maghrib</TableHead>
            <TableHead>Isha</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          <TableRow>
            <TableCell className="font-semibold">Begins</TableCell>
            {prayers.map((time, index) => (
              <TableCell key={index}>{time}</TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell className="font-semibold">Jama'ah</TableCell>
            {jamaatTimes.map((time, index) => (
              <TableCell key={index}>{time}</TableCell>
            ))}
          </TableRow>

        </TableBody>
      </Table>
    </div>
  );
};

export default Timetable;
