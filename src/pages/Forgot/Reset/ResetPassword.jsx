import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ResetPassword.scss";
import { authService } from "../../../services/authService";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            toast.error("Token không hợp lệ.");
            return;
        }
        if (password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp.");
            return;
        }

        try {
            await authService.resetPassword(token, password);
            toast.success("Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại.");
            navigate("/login");
        } catch (err) {
            toast.error(err.message || "Có lỗi xảy ra.");
        }
    };

    return (
        <div className="reset-password-wrapper">
            <div className="reset-password-container">
                <h2>Đặt lại mật khẩu</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Mật khẩu mới"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Xác nhận</button>
                    <p className="back-login" onClick={() => navigate("/login")}>
                        Quay lại đăng nhập
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
