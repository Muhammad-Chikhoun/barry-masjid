// home.jsx
// home page of the website

import * as React from "react";
import Timetable from "./timetable";
import HomeCarousel from "./homeCarousel";

const Home = () => {
    return (
        <div>
          <div className="w-full h-full md:px-50 py-2 ">
            <Timetable />
          </div>
          <HomeCarousel />
        </div>
    )
}

export default Home;