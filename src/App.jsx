import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import RegisterPartner from "./pages/Partners/Register/RegisterPartner.jsx";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";

import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users.jsx";
import UserForm from "./pages/Users/Detail/UserForm.jsx";

import Hotels from "./pages/Hotel/Hotels";
import HotelForm from "./pages/Hotel/Detail/HotelForm.jsx";

import Tours from "./pages/Tours/Tours";
import Bookings from "./pages/Booking/Bookings";
import Revenue from "./pages/Revenue/Revenue";

import Partners from "./pages/Partners/Partners";
import PartnerDetailForm from "./pages/Partners/Detail/PartnerDetailForm.jsx";
import Settings from "./pages/Settings/Settings";

import { ToastContainer } from "react-toastify";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.jsx";
import Unauthorized from "./components/UnauthorizedPage/Unauthorized.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register-partner" element={<RegisterPartner />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />

                    {/* Protected routes */}
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <MainLayout />
                            </PrivateRoute>
                        }
                    >
                        {/* Tất cả user đăng nhập đều vào được dashboard */}
                        <Route index element={<Dashboard />} />

                        {/* Admin only */}
                        <Route
                            path="users"
                            element={
                                <PrivateRoute allowedRoles={["admin"]}>
                                    <Users />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="users/:id"
                            element={
                                <PrivateRoute allowedRoles={["admin"]}>
                                    <UserForm />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="users/new"
                            element={
                                <PrivateRoute allowedRoles={["admin"]}>
                                    <UserForm />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="partners"
                            element={
                                <PrivateRoute allowedRoles={["admin"]}>
                                    <Partners />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="partners/new"
                            element={
                                <PrivateRoute allowedRoles={["admin"]}>
                                    <PartnerDetailForm />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="partners/:id"
                            element={
                                <PrivateRoute allowedRoles={["admin"]}>
                                    <PartnerDetailForm />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="settings"
                            element={
                                <PrivateRoute allowedRoles={["admin"]}>
                                    <Settings />
                                </PrivateRoute>
                            }
                        />

                        {/* Hotel owner */}
                        <Route
                            path="hotels"
                            element={
                                <PrivateRoute allowedRoles={["admin", "hotel_owner"]}>
                                    <Hotels />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="hotels/new"
                            element={
                                <PrivateRoute allowedRoles={["admin", "hotel_owner"]}>
                                    <HotelForm />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="hotels/:id"
                            element={
                                <PrivateRoute allowedRoles={["admin", "hotel_owner"]}>
                                    <HotelForm />
                                </PrivateRoute>
                            }
                        />

                        {/* Tour provider */}
                        <Route
                            path="tours"
                            element={
                                <PrivateRoute allowedRoles={["admin", "tour_provider"]}>
                                    <Tours />
                                </PrivateRoute>
                            }
                        />

                        {/* Shared: bookings + revenue */}
                        <Route
                            path="bookings"
                            element={
                                <PrivateRoute allowedRoles={["admin", "hotel_owner", "tour_provider"]}>
                                    <Bookings />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="revenue"
                            element={
                                <PrivateRoute allowedRoles={["admin", "tour_provider"]}>
                                    <Revenue />
                                </PrivateRoute>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer position="top-right" autoClose={3000} />
            <LoadingSpinner />
        </>
    );
}

export default App;
