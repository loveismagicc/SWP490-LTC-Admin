import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { Outlet } from "react-router-dom";
import "../App.scss"; // nếu cần

const MainLayout = () => {
    return (
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <Header />
                <Breadcrumb />
                <Outlet /> {/* Hiển thị page con */}
            </div>
        </div>
    );
};

export default MainLayout;
