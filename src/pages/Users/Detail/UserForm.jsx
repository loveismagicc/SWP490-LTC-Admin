import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userService } from "../../../services/userService";
import "./UserForm.scss";

const roles = ["admin", "user", "moderator"];

const UserForm = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        role: "user",
    });

    useEffect(() => {
        if (isEdit) {
            userService
                .getUserById(id)
                .then((data) => setUser(data))
                .catch((err) => {
                    toast.error("Không tìm thấy người dùng!");
                    navigate("/users");
                });
        }
    }, [id, isEdit, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await userService.updateUser(id, user);
                toast.success("✅ Cập nhật người dùng thành công");
            } else {
                await userService.createUser(user);
                toast.success("🆕 Thêm người dùng thành công");
            }
            navigate("/users");
        } catch (error) {
            toast.error("❌ Lỗi khi lưu người dùng");
        }
    };

    return (
        <div className="user-form-page">
            <h2>{isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}</h2>
            <form className="user-form" onSubmit={handleSubmit}>
                {isEdit && (
                    <div className="form-group">
                        <label>ID</label>
                        <input type="text" value={id} disabled />
                    </div>
                )}

                <div className="form-group">
                    <label>Tên đăng nhập</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Vai trò</label>
                    <select
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        required
                    >
                        {roles.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-save">
                    {isEdit ? "💾 Lưu thay đổi" : "➕ Thêm mới"}
                </button>
            </form>
        </div>
    );
};

export default UserForm;
