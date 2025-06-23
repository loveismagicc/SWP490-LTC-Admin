import React from "react";
import { useNavigate } from "react-router-dom";
import "./Unauthorized.scss";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="unauthorized-page">
            <h1>403 - Unauthorized</h1>
            <p>Bạn không có quyền truy cập vào trang này.</p>
            <button onClick={() => navigate("/")}>Về trang chủ</button>
        </div>
    );
};

export default Unauthorized;
