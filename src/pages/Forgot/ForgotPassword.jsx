import React, { useState } from "react";
import "./ForgotPassword.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../../services/authService";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await authService.sendForgotPasswordEmail(email);
            toast.success("Đã gửi yêu cầu khôi phục mật khẩu. Vui lòng kiểm tra email!");
            setEmail("");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Gửi email thất bại!");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="forgot-password-wrapper">
            <div className="forgot-password-container">
                <div className="left-pane">
                    <h2>Travel Admin</h2>
                    <p>Bạn quên mật khẩu?</p>
                </div>
                <div className="right-pane">
                    <h2>Quên mật khẩu</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={submitting}
                        />
                        <button type="submit" disabled={submitting}>
                            {submitting ? "Đang gửi..." : "Gửi lại mật khẩu"}
                        </button>
                        <p className="back-login" onClick={() => navigate("/login")}>
                            Quay lại đăng nhập
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
