import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { FaBell, FaUserCircle } from "react-icons/fa";
import {authService} from "../../services/authService.js";

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate();

    const user = authService.getUser();

    const handleLogout = () => {
        // 1. Xoá token khỏi localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        // 2. Có thể gọi API logout nếu cần
        // await api.post('/auth/logout')...

        // 3. Điều hướng về trang đăng nhập
        navigate("/login");
    };

    // Đóng dropdown nếu click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="header-admin">
            <div className="left">{/* breadcrumb hoặc logo */}</div>
            <div className="right">
                <FaBell className="icon bell" />
                <div className="avatar-wrapper" ref={dropdownRef}>
                    <FaUserCircle
                        className="icon avatar"
                        onClick={() => setOpenMenu((prev) => !prev)}
                    />
                    {openMenu && user && (
                        <div className="dropdown">
                            <div className="user-info">
                                <div className="name">{user.name || "Chưa có tên"}</div>
                                <div className="email">{user.email || "Chưa có email"}</div>
                            </div>
                            <button className="logout-btn" onClick={handleLogout}>
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
