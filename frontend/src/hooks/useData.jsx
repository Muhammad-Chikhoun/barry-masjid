// All raw data localised for faster smoother access
// Access functions using import { functionName } from "../hooks/useData.jsx"

import data from "../assets/data.json"

export function address(){
    return data.rawdata.association
}

export function services(){
    return [
            ("Women Space", data.rawdata.womenSpace),
            ("Janaza Prayer",data.rawdata.janazaPrayer),
            ("Aid Prayer",data.rawdata.aidPrayer),
            ("Children Courses",data.rawdata.childrenCourses),
            ("Adult Courses",data.rawdata.adultCourses),
            ("Ramadan Meal",data.rawdata.ramadanMeal),
            ("Handicap Accessibility",data.rawdata.handicapAccessibility),
            ("Ablutions",data.rawdata.ablutions),
            ("parking",data.rawdata.parking),
    ]
}

export function other(){
    return data.rawdata.otherInfo
}

//prayer index: 0=fajr 1=shuruq 2=dhur 3=asr 4=maghrib 5=isha
export function getPrayerTime(month, day, prayerIndex) {
  return data.rawdata.calendar[month]?.[String(day)]?.[prayerIndex] ?? null;
}

//prayer index: 0=fajr 1=dhur 2=asr 3=maghrib 4=isha
export function getJamatTime(month, day, prayerIndex) {
  return data.rawdata.iqamaCalendar[month]?.[String(day)]?.[prayerIndex] ?? null;
}

// How to access the month data {calendarMonth("monthNo 0-11")["date"]["salaah 0-5, 0=fajr, 1=shuruq, and onwards"]}if wanted
// calendarMonth(0)["4"][0]} gives fajr time on the 4th of january
// Ideally used to access the full month for month page
export function calendarMonth(month){
    return data.rawdata.calendar[month]
}

// How to access the month data {calendarMonth("monthNo 0-11")["date"]["salaah 0-5, 0=fajr, 1=shuruq, and onwards"]} if wanted
// calendarMonth(0)["4"][0]} gives fajr jamat time on the 4th of january
// Ideally used to access the full month for month page
export function iqamaCalendar(month){
    return data.rawdata.iqamaCalendar[month]
}