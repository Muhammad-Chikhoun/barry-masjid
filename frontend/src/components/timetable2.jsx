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

import { fullDay, suhoorEnd } from "@/hooks/useData";
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

    const otherTimes = [
    [times[0], "Suhoor End"],
    [times[2], "Sunrise"],
    [times[3], "Zawaal"],
    [times[6], "Sunset"],
    [times[10], "Jumu'ah"]
  ]
  
  const mixedTimes = [    
    times[1],
    times[9],
    times[4],
    times[10],
    times[5],
    times[11],
    times[7],
    times[12],
    times[8],
    times[13],
  ]

  const jamaatTimes = times.slice(9,14)
 
  return (
    <div className="flex items-center justify-center ">
      <div className="items-center py-5 gap-5 text-black overflow-x-auto ">

        
      <div className="flex flex-col pb-2">
        <h1 className="text-xl md:text-3xl font-bold text-center text-primary">
          Today's Salah Times
        </h1>
      </div>


<Table className="table-auto border-separate border-spacing-0 rounded-lg overflow-hidden">
  <TableHeader>
    <TableRow>
      <TableHead></TableHead>
      {headings.map((heading, index) => (
        <TableHead
          key={index}
          colSpan={2}
          className="text-left text-[13px]"
        >
          {heading}
        </TableHead>
      ))}
    </TableRow>
  </TableHeader>

  <TableBody>
    <TableRow>
      <TableHead className="text-left text-[13px] text-primary">
        Begins
      </TableHead>
      {beginsTimes.map((time, index) => (
        <TableCell
          key={index}
          colSpan={2}
          className="text-left text-[13px]"
        >
          {time}
        </TableCell>
      ))}
    </TableRow>

    <TableRow>
      <TableHead className="text-left text-[13px] text-primary ">
        Jam'aat
      </TableHead>
      {jamaatTimes.map((time, index) => (
        <TableCell
          key={index}
          colSpan={2}
          className="text-left text-[13px]"
        >
          {time}
        </TableCell>
      ))}
    </TableRow>

    {/* Other times */}
<TableRow>
  {otherTimes.map(([time, title], index) => {
    const isEven = index % 2 === 0;
    const bgColor = isEven ? "bg-primary" : "bg-[#244f39a9]";
    const textColor = "text-white";

    return (
          <React.Fragment key={index}>
            <TableHead className="p-0">
              <div className={`m-0 p-2 rounded-l-lg ${bgColor} ${textColor}`}>
                {title}:
              </div>
            </TableHead>
            <TableCell className="p-0">
              <div className={`mr-1 p-2 rounded-r-lg ${bgColor} ${textColor}`}>
                {time}
              </div>
            </TableCell>
          </React.Fragment>
    );
  })}
</TableRow>

  </TableBody>
</Table>

<div className="flex flex-row justify-center gap-3 pt-2">
  <Button onClick={() => navigate("/timetable")}>
    View Full Timetable
  </Button>
  <Button onClick={() => navigate("/timetable")}>
    Download Timetable PDF
  </Button>
</div>

      </div>
    </div>
  );
};

export default Timetable;
