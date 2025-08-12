// home.jsx
// home page of the website

import * as React from "react";
import Timetable from "../components/timetable2";
import HomeCarousel from "../components/homeCarousel";
import News from "@/components/news";

const Home = () => {
    return (
        <div>
            <Timetable />
            <HomeCarousel />
            {/*<News />*/}
        </div>
    )
}

export default Home;