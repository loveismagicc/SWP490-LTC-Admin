import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable/DataTable";
import { userService } from "../../services/userService";
import "./Users.scss";
import { toast } from "react-toastify";

const Users = () => {
    const navigate = useNavigate();
    const tableRef = useRef();

    const columns = [
        { key: "_id", label: "ID" },
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

    const handleDelete = async (row) => {
        if (window.confirm(`Bạn có chắc chắn muốn xoá user ${row.email}?`)) {
            try {
                await userService.deleteUser(row._id);
                toast.success("Xoá thành công!");
                tableRef.current?.reload();
            } catch (error) {
                toast.error("Xoá thất bại!");
            }
        }
    };

    const handleRowClick = (row) => {
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
                ref={tableRef}
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
