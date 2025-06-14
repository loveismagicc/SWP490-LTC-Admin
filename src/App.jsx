import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";

import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Hotels from "./pages/Hotel/Hotels";
import Tours from "./pages/Tours/Tours";
import Bookings from "./pages/Booking/Bookings";
import Revenue from "./pages/Revenue/Revenue";
import Partners from "./pages/Partners/Partners";
import Settings from "./pages/Settings/Settings";
import {ToastContainer} from "react-toastify";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.jsx";

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  {/* Route login KHÔNG dùng layout */}
                  <Route path="/login" element={<Login />} />

                  {/* Routes cần login -> có layout */}
                  <Route
                      path="/"
                      element={
                          <PrivateRoute>
                              <MainLayout />
                          </PrivateRoute>
                      }
                  >
                      <Route index element={<Dashboard />} />
                      <Route path="users" element={<Users />} />
                      <Route path="hotels" element={<Hotels />} />
                      <Route path="tours" element={<Tours />} />
                      <Route path="bookings" element={<Bookings />} />
                      <Route path="revenue" element={<Revenue />} />
                      <Route path="partners" element={<Partners />} />
                      <Route path="settings" element={<Settings />} />
                  </Route>
              </Routes>
          </BrowserRouter>
          <ToastContainer position="top-right" autoClose={3000} />
          <LoadingSpinner />
      </>
  );
}

export default App;
