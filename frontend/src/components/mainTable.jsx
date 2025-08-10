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
  const {niceDate} = useDateTime();

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

  const times2 = fullDay(monthNum, parseInt(currentDate));

  const headings = [
    "Date",
    "Suhoor\nEnd",
    "Fajr",
    "Sunrise",
    "Zawaal",
    "Zuhr",
    "Asr",
    "Sunset",
    "Maghrib",
    "Isha",
    "Fajr",
    "Zuhr",
    "Asr",
    "Maghrib",
    "Isha",
  ];



  return (
  <div className="overflow-x-auto text-black justify-center">
        <br />

{/*
<div className="max-w-5xl mx-auto px-4 py-5">
  <h1 className="font-bold text-4xl text-primary">
    Salah Times{" "}
    <span className="text-lg text-gray-600 font-normal">
      for today: {niceDate}
    </span>
  </h1>
  <hr className="border-t-3 border-primary" />
</div>
*/}


        <Table className="w-fit mx-auto text-center">
          <TableHeader>
            <TableRow>
                <TableHead colSpan={1}></TableHead> {/* For the Date column */}
                <TableHead colSpan={9} className="text-center font-bold text-2xl text-primary">Beginning Times</TableHead>
                <TableHead colSpan={5} className="text-center font-bold text-2xl text-primary">Jamaat Times</TableHead>
            </TableRow>
            <TableRow className="border-1 border-b-black">
                {headings.map((time, index) => (
                <TableHead className={index === 0 || index === 9 ? "text-center text-sm border-r-1 border-black" : "text-center text-sm"} key={index}>{time}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="border-r-1 border-black" >{currentDate}</TableCell>
              {times2.map((time, index) => (
                <TableCell className={index === 8 ? "text-center text-sm border-r-1 border-black" : "text-center text-sm"} key={index}>{time}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>

        <br />


      <div className="max-w-5xl mx-auto px-4 py-5">
        <h1 className="font-bold text-4xl text-primary">Salah Timetable{" "}
          <span className="text-lg text-gray-600 font-normal">for the month of {months[currentMonth]}</span>
        </h1>
        <hr className="border-t-3 border-primary" />
      </div>

        <Table className="w-fit mx-auto text-center">
            <TableCaption>{months[currentMonth]} Prayer Times</TableCaption>

        <TableHeader>
            <TableRow>
                <TableHead colSpan={1}></TableHead> {/* For the Date column */}
                <TableHead colSpan={9} className="text-center font-bold text-2xl text-primary">Beginning Times</TableHead>
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
                <TableHead  className="text-center text-[10px] md:text-sm">Maghrib</TableHead>
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
                    className={rowIndex+1 === parseInt(currentDate) && currentMonth === monthNum ? "bg-primary text-white " : ""}
                  >
                    <TableCell className="text-[10px] md:text-xs border-r-1 border-black">{rowIndex + 1}</TableCell>
                      {row.map((cell, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          className={`text-[10px] md:text-xs leading-tight ${cellIndex === 8 ? "border-r-1 border-black" : ""}`}
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
