// mainTable.jsx
// mainTable component for home page

import * as React from "react";
import { Button } from "../components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  } from "../components/ui/table";

import { fullDay, getMonthLength } from "@/hooks/useData";
import useDateTime from "../hooks/useDateTime";

//15 cols, first all begining times, zawaal etc, then jamaat.
const Timetable = () => {
  const {monthNum} = useDateTime();
  const {months} = useDateTime();
  const {dateOnly} = useDateTime();

  const cantPray = "#8c0409"
  const headings = [
    ["Date", 1],
    ["Suhoor\nEnd", 0, "#451d01"],
    ["Fajr", 0],
    ["Sunrise", 0, cantPray],
    ["Zawaal", 0, cantPray],
    ["Zuhr", 0],
    ["Asr", 0],
    ["Sunset", 0, cantPray],
    ["Maghrib", 0],
    ["Isha", 1],
    ["Fajr", 0],
    ["Zuhr", 0],
    ["Asr", 0],
    ["Maghrib", 0],
    ["Isha", 0],
  ];

  //useState that manages the changing months to see different monthly calenders
  //useState for the date, so that it changes reactively as date changes to show current date on timetable
  const [currentMonth, setCurrentMonth] = React.useState(monthNum);
  const [currentDate] =  React.useState(dateOnly);

  //retrieves a 2D array of all the times for the month
  const times = React.useMemo(() => {
    const monthTimes = [];
    const daysInMonth = getMonthLength(currentMonth);
    for (let day = 1; day <= daysInMonth; day++) {
      monthTimes.push(fullDay(currentMonth, day));
    }
    return monthTimes;
  }, [currentMonth]);


  return (
    <div className="overflow-x-auto text-black">
      {/*Title and divider */}
      <div className="max-w-5xl mx-auto px-4 py-5 pt-15">
        <h1 className="font-bold text-xl text-primary md:text-4xl">Salah Timetable{" "}
          <span className="text-sm text-gray-600 font-normal md:text-lg">for the month of {months[currentMonth]}</span>
        </h1>
        <hr className="border-t-3 border-primary" />
      </div>

      <Table className="w-fit mx-auto text-center">

        {/*Header and caption*/}
        <TableCaption>{months[currentMonth]} Prayer Times</TableCaption>
        <TableHeader>

          <TableRow>
            <TableHead colSpan={1}></TableHead> {/* Date column */}
            <TableHead colSpan={9} className="font-bold md:text-2xl text-lg text-primary text-center">Beginning Times</TableHead>
            <TableHead colSpan={5} className="font-bold md:text-2xl text-lg text-primary text-center">Jamaat Times</TableHead>
          </TableRow>

          <TableRow className="border-1 border-b-black">
            {headings.map((heading, index) => (
              <TableHead key={index} className={`text-[10px] md:text-sm text-center ${heading[1] ? "border-r-1 border-black" : ""}`}>{heading[0]}</TableHead>
            ))}
          </TableRow>

        </TableHeader>

        <TableBody>

          {/*Days loop*/}
          {times.map((row, rowIndex) => (

            <TableRow key={rowIndex} className={rowIndex + 1 === parseInt(currentDate) && currentMonth === monthNum ? "bg-primary text-white" : ""}>
              {/*Date*/}
              <TableCell className="text-[10px] md:text-xs border-r-1 border-black">{rowIndex + 1}</TableCell>
                {/*Times loop*/}
                {row.map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    style={headings[cellIndex+1][2] && (rowIndex + 1 != parseInt(currentDate)) ? { color: headings[cellIndex+1][2] } : undefined}
                    className={`text-[10px] md:text-xs leading-tight ${cellIndex === 8 ? "border-r-1 border-black" : ""}`}
                  >
                    {cell}
                  </TableCell>
                ))}
            </TableRow>
          ))}

        </TableBody>
      </Table>

      {/*Timetable month manager*/}
      <div className="flex items-center justify-center gap-4 my-4">
          <Button onClick={() => setCurrentMonth((prev) => Math.max(prev - 1, 0))}>Prev</Button>
          <h1 className="font-semibold">{months[currentMonth]}</h1>
          <Button onClick={() =>setCurrentMonth((prev) => Math.min(prev + 1, months.length - 1))}>Next {}</Button>
      </div>
  </div>

  );
};

export default Timetable;
