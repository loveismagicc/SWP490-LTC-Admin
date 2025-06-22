import React from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable/DataTable";
import { userService } from "../../services/userService";
import "./Users.scss";
import {toast} from "react-toastify";

const Users = () => {
    const navigate = useNavigate();

    const columns = [
        { key: "id", label: "ID" },
        { key: "username", label: "Tên đăng nhập" },
        { key: "email", label: "Email" },
        { key: "role", label: "Vai trò" },
    ];

    const fetchData = async (page, limit, search) => {
        const res = await userService.getUsers(page, limit, search);
        return {
            data: res.data,
            total: res.total,
        };
    };

    const handleEdit = (row) => {
        navigate(`/users/${row._id}`);
    };

    const handleDelete = (row) => {
        if (window.confirm(`Bạn có chắc chắn muốn xoá user ${row.email}?`)) {
            userService.deleteUser(row._id).then(() => {
                toast.success("Xoá thành công!");
                navigate("/users");
            });
        }
    };

    const handleRowClick = (row) => {
        console.log(row);
        navigate(`/users/${row._id}`);
    };

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
                onRowClick={handleRowClick}
                actions={[
                    {
                        label: "Sửa",
                        icon: "✏️",
                        action: handleEdit,
                        className: "btn-edit",
                    },
                    {
                        label: "Xoá",
                        icon: "🗑️",
                        action: handleDelete,
                        className: "btn-delete",
                    },
                ]}
            />
        </div>
    );
};

export default Users;
