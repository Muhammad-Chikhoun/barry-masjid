// mainTable.jsx
// mainTable component for home page

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
import { Button } from "./ui/button"

import { fullDay, getMonthLength } from "@/hooks/useData";
import useDateTime from "../hooks/useDateTime";

//13 rows, first all begining times, zawaal etc, then jamaat.
const mainTable = () => {
  const {monthNum} = useDateTime();
  const {months} = useDateTime();
  const {dateOnly} = useDateTime();

  const [currentMonth, setCurrentMonth] = React.useState(monthNum);
  const [currentDate] =  React.useState(dateOnly);

  const times = React.useMemo(() => {
    const monthTimes = [];
    const daysInMonth = getMonthLength(currentMonth);
    for (let day = 1; day <= daysInMonth; day++) {
      monthTimes.push(fullDay(currentMonth, day));
    }
    return monthTimes;
  }, [currentMonth]);



  return (
  <div className="overflow-x-auto text-black justify-center">
        <br />
        <Table className="w-fit mx-auto text-center">
            <TableCaption>{months[currentMonth]} Prayer Times</TableCaption>

        <TableHeader>
            <TableRow>
                <TableHead colSpan={1}></TableHead> {/* For the Date column */}
                <TableHead colSpan={8} className="text-center font-bold text-2xl text-primary">Beginning Times</TableHead>
                <TableHead colSpan={5} className="text-center font-bold text-2xl text-primary">Jamaat Times</TableHead>
            </TableRow>
            <TableRow className="border-1 border-b-black">
                <TableHead  className="text-center text-[10px] md:text-sm border-r-1 border-black">Date</TableHead>
                <TableHead  className="text-center text-[10px] md:text-sm">Suhoor<br />End</TableHead>
                <TableHead  className="text-center text-[10px] md:text-sm">Fajr</TableHead>
                <TableHead  className="text-center text-[10px] md:text-sm">Sunrise</TableHead>
                <TableHead  className="text-center text-[10px] md:text-sm">Zawaal</TableHead>
                <TableHead  className="text-center text-[10px] md:text-sm">Zuhr</TableHead>
                <TableHead  className="text-center text-[10px] md:text-sm">Asr</TableHead>
                <TableHead  className="text-center text-[10px] md:text-sm">Sunset</TableHead>
                <TableHead  className="text-center text-[10px] md:text-sm border-r-1 border-black">Isha</TableHead>
                <TableHead  className="text-center text-[10px] md:text-sm">Fajr</TableHead>
                <TableHead  className="text-center text-[10px] md:text-sm">Zuhr /<br />Jumu'ah</TableHead>
                <TableHead  className="text-center text-[10px] md:text-sm">Asr</TableHead>
                <TableHead  className="text-center text-[10px] md:text-sm">Maghrib</TableHead>
                <TableHead  className="text-center text-[10px] md:text-sm">Isha</TableHead>
            </TableRow>
        </TableHeader>


              <TableBody>
                {times.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className={rowIndex+1 === parseInt(currentDate) && currentMonth === monthNum ? "bg-yellow-100 " : ""}
                  >
                    <TableCell className="text-[10px] md:text-xs border-r-1 border-black">{rowIndex + 1}</TableCell>
                      {row.map((cell, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          className={`text-[10px] md:text-xs leading-tight ${cellIndex === 7 ? "border-r-1 border-black" : ""}`}
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                ))}
              </TableBody>
              </Table>

            <div className="flex items-center justify-center gap-4 my-4">
              <Button onClick={() => setCurrentMonth((prev) => Math.max(prev - 1, 0))}>Prev</Button>

              <h1 className="font-semibold">{months[currentMonth]}</h1>

              <Button className="" onClick={() =>setCurrentMonth((prev) => Math.min(prev + 1, months.length - 1))}>Next {}</Button>
            </div>


    </div>
  );
};

export default mainTable;
