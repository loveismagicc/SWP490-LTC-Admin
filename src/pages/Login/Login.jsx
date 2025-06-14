import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import {authService} from "../../services/authService.js";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // await authService.login(username, password);
            localStorage.setItem('accessToken', 'fake');
            navigate("/"); // ✅ Chuyển vào layout chính
        } catch (err) {
            alert("Đăng nhập thất bại");
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Đăng nhập</h2>
                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
};

export default Login;
