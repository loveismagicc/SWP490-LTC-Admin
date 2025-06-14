import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import Header from "./components/Header/Header";


import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Hotels from "./pages/Hotel/Hotels";
import Tours from "./pages/Tours/Tours";
import Bookings from "./pages/Booking/Bookings";
import Revenue from "./pages/Revenue/Revenue";
import Partners from "./pages/Partners/Partners";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Breadcrumb /> {/* Hiển thị trên tất cả trang */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
