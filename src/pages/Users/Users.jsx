import React from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable/DataTable";
import "./Users.scss";

const Users = () => {
    const navigate = useNavigate();

    const roles = ["admin", "user", "moderator"];
    const users = [];

    for (let i = 1; i <= 50; i++) {
        users.push({
            id: i,
            username: `user${i}`,
            email: `user${i}@example.com`,
            role: roles[i % roles.length],
        });
    }

    const columns = [
        { key: "id", label: "ID" },
        { key: "username", label: "Tên đăng nhập" },
        { key: "email", label: "Email" },
        { key: "role", label: "Vai trò" },
    ];

    const fetchData = async (page, limit, search) => {
        let filtered = users;

        if (search) {
            filtered = filtered.filter(
                (u) =>
                    u.username.toLowerCase().includes(search.toLowerCase()) ||
                    u.email.toLowerCase().includes(search.toLowerCase()) ||
                    u.role.toLowerCase().includes(search.toLowerCase())
            );
        }

        const start = (page - 1) * limit;
        const end = start + limit;

        return {
            data: filtered.slice(start, end),
            total: filtered.length,
        };
    };

    const handleEdit = (id) => navigate(`/users/${id}`);
    const handleDelete = (id) => {
        alert(`Xoá user có ID ${id}`);
    };
    const handleRowClick = (row) => navigate(`/users/${row.id}`);


    return (
        <div>
            <div className="table-header">
                <h2>Danh sách người dùng</h2>
                <button className="btn-add" onClick={() => navigate("/users/new")}>
                    ➕ Thêm mới
                </button>
            </div>
            <DataTable
                columns={columns}
                fetchData={fetchData}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRowClick={handleRowClick}
            />
        </div>
    );
};

export default Users;
