// timetable.jsx
// timetable component for home page

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

const HomeTable = () => {
  const { monthNum, dateOnly, monthName, time } = useDateTime();
  const [currentDate] = React.useState(dateOnly);

  const navigate = useNavigate();

  const times = fullDay(monthNum, parseInt(currentDate));
  const showThirdButton = false;

  const headings = ["Fajr", "Zuhr", "Asr", "Maghrib", "Isha"];

  const beginsTimes = [times[1], times[4], times[5], times[7], times[8]];

  const otherTimes = [
    [times[0], "Suhoor End"],
    [times[2], "Sunrise"],
    [times[3], "Zawaal"],
    [times[6], "Sunset"],
    [times[10], "Jumu'ah"],
  ];

  const jamaatTimes = times.slice(9, 14);

  // "HH:MM" -> minutes since midnight
  const toMinutes = (hhmm) => {
    if (!hhmm) return 0;
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };

  // Determine current salah index based on Begins times
  const getCurrentSalahIndex = () => {
    const nowMin = toMinutes(time);
    const starts = beginsTimes.map(toMinutes);
    const n = starts.length;

    if (nowMin < starts[0]) return n - 1;
    for (let i = 0; i < n - 1; i++) {
      if (nowMin >= starts[i] && nowMin < starts[i + 1]) return i;
    }
    return n - 1;
  };

  const currentSalahIndex = getCurrentSalahIndex();

  return (
    <div className="flex items-center justify-center ">
      <div className="items-center py-5 px-4 gap-5 text-black overflow-x-auto ">
        <div className="flex flex-col pb-2">
          <h1 className="text-xl md:text-3xl font-bold text-left text-primary">
            Today&apos;s Salah Times
          </h1>
          <hr className="border-t-3 border-primary" />
        </div>

        {/* DESKTOP / TABLET (original) */}
        <div className="hidden md:block">
          <Table className="table-auto border-separate border-spacing-0 rounded-lg overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                {headings.map((heading, index) => (
                  <TableHead key={index} colSpan={2} className="text-center text-[13px]">
                    {heading}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableHead className="text-center text-[13px] text-primary">
                  Begins
                </TableHead>
                {beginsTimes.map((time, index) => (
                  <TableCell
                    key={index}
                    colSpan={2}
                    className={`text-center text-[13px] ${
                      index === currentSalahIndex ? "bg-primary text-white rounded-t-md" : ""
                    }`}
                  >
                    {time}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableHead className="text-center text-[13px] text-primary ">
                  Jam&apos;aat
                </TableHead>
                {jamaatTimes.map((time, index) => (
                  <TableCell
                    key={index}
                    colSpan={2}
                    className={`text-center text-[13px] ${
                      index === currentSalahIndex ? "bg-primary text-white rounded-b-md" : ""
                    }`}
                  >
                    {time}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* MOBILE (transposed) */}
        <div className="block md:hidden">
          <div className="flex flex-row gap-3">
            {/* Table */}
            <div className="flex-1">
              <Table className="table-auto border-separate border-spacing-0 rounded-lg overflow-hidden w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left text-[13px]"></TableHead>
                    <TableHead className="text-center text-[13px]">Begins</TableHead>
                    <TableHead className="text-center text-[13px]">Jam&apos;aat</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {headings.map((label, i) => (
                    <TableRow key={label}>
                      <TableHead className="text-left text-[13px] text-primary">{label}</TableHead>
                      <TableCell
                        className={`text-center text-[13px] ${
                          i === currentSalahIndex ? "bg-primary text-white rounded-l-md" : ""
                        }`}
                      >
                        {beginsTimes[i]}
                      </TableCell>
                      <TableCell
                        className={`text-center text-[13px] ${
                          i === currentSalahIndex ? "bg-primary text-white rounded-r-md" : ""
                        }`}
                      >
                        {jamaatTimes[i]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Other times cards */}
            <div className="flex flex-col justify-start gap-2 w-[120px]">
              {otherTimes.map(([val, label], i) => (
                <div
                  key={`${label}-${i}`}
                  className="rounded-md bg-[#244f39a9] text-white text-[11px] px-2 py-1 flex flex-col items-center text-center"
                >
                  <span className="opacity-90">{label}</span>
                  <span className="font-semibold">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* OTHER TIMES — compact cards (desktop, same style as mobile) */}
        <div className="mt-4 hidden md:flex">
          <div className="flex flex-row flex-wrap gap-2">
            {otherTimes.map(([val, label], i) => (
              <div
                key={`${label}-${i}`}
                className="rounded-md bg-[#244f39a9] text-white text-[11px] px-3 py-2 flex flex-col items-center text-center w-[140px]"
              >
                <span className="opacity-90">{label}</span>
                <span className="font-semibold">{val}</span>
              </div>
            ))}
          </div>
        </div>


        <br />
        <div className="flex flex-row gap-1 pt-2">
          <Button
            className="w-full sm:w-auto flex-1 md:text-sm text-[10px] whitespace-normal text-center px-2 py-2"
            onClick={() => navigate("/timetable")}
          >
            View Full Timetable
          </Button>
          <Button
            className="w-full sm:w-auto flex-1 md:text-sm text-[10px] whitespace-normal text-center px-2 py-2"
            onClick={() => navigate("/timetable")}
          >
            Download Timetable PDF
          </Button>
          {showThirdButton && (
            <Button
              className="w-full sm:w-auto flex-1 md:text-sm text-[10px] whitespace-normal text-center px-2 py-2"
              onClick={() => navigate("/special-page")}
            >
              Download Ramadan Timetable PDF
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeTable;
