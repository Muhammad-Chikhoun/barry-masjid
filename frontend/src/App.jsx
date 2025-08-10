import * as React from "react";
import Header  from "./components/header";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import MainTable from "./components/mainTable";
import Dev from "./components/dev";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timetable" element={<MainTable />} />
          <Route path="/live" element={<Dev />} />
          <Route path="/donate" element={<Dev />} />
          <Route path="/madrassah" element={<Dev />} />
          <Route path="/contact" element={<Dev />} />
          <Route path="*" element={<div className="p-6">404 - Not found</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
export default App;
