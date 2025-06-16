import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UserForm.scss";

const roles = ["admin", "user", "moderator"];

// 🔧 Giả lập dữ liệu user
const fakeUserData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    username: `user${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
}));

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
            const found = fakeUserData.find((u) => u.id === parseInt(id));
            if (found) setUser({ ...found });
            else alert("Không tìm thấy người dùng");
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            alert(`✅ Đã cập nhật user "${user.username}"`);
        } else {
            alert(`🆕 Đã thêm mới user "${user.username}"`);
        }

        navigate("/users");
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
