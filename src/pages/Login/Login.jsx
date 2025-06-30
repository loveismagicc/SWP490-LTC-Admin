import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import {toast} from "react-toastify";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await authService.login(username, password);

            if (data.user?.status === 'banned') {
                throw new Error("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.");
            }
            localStorage.setItem("accessToken", data.accessToken);
            navigate("/");
        } catch (error) {
            toast.error(error.message || "Đăng nhập thất bại");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="login-left">
                    <div className="overlay">
                        <h1>Travel Admin</h1>
                        <p>Chào mừng đến hệ thống quản trị</p>
                    </div>
                </div>
                <div className="login-right">
                    <form className="login-form" onSubmit={handleLogin}>
                        <h2>Đăng nhập</h2>
                        <div className="input-group">
                            <input
                                type="text"
                                id="username"
                                placeholder=" "
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label htmlFor="username">Tên đăng nhập</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                id="password"
                                placeholder=" "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Mật khẩu</label>
                        </div>
                        <button type="submit" className="btn-login">Đăng nhập</button>
                        <div className="forgot">
                            <a href="/forgot">Quên mật khẩu?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
