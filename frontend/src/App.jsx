import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/header";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./pages/home";
import Timetable from "./pages/timetable";
import Contact from "./pages/contact";
import Dev from "./components/dev";
import Live from "./pages/live";
import Error from "./pages/error";
import Screen from "./pages/screen";
import Donation from "./pages/donation";

function App() {
  const location = useLocation();
  const noLayoutPages = ["/screen12345"];
  const hideLayout = noLayoutPages.includes(location.pathname);

  return (
    <div className="flex flex-col">
      {/* Header + Navbar */}
      {!hideLayout && <Header />}
      {!hideLayout && <Navbar />}

      <main>
        <Routes>
          <Route path="barry-masjid/" element={<Home />} />
          <Route path="barry-masjid/timetable" element={<Timetable />} />
          <Route path="barry-masjid/live" element={<Live />} />
          <Route path="barry-masjid/donate" element={<Donation />} />
          <Route path="barry-masjid/madrassah" element={<Dev />} />
          <Route path="barry-masjid/contact" element={<Contact />} />
          <Route path="barry-masjid/screen12345" element={<Screen />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>

      {!hideLayout && (
        <div className="mt-auto">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
