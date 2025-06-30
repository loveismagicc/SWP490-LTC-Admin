import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import DataTable from "../../components/DataTable/DataTable";
import {userService} from "../../services/userService";
import {toast} from "react-toastify";
import "./Users.scss";
import {userStatusMap} from "../../utils/enum/userStatusMap";
import PopupModal from "../../components/Popup/PopupModal";

const Users = () => {
    const tableRef = useRef();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [popupConfig, setPopupConfig] = useState({
        title: "",
        message: "",
        onConfirm: () => {
        },
    });

    const openConfirm = (title, message, callback) => {
        setPopupConfig({
            title,
            message,
            onConfirm: () => {
                callback();
                setShowModal(false);
            },
        });
        setShowModal(true);
    };

    const columns = [
        {key: "_id", label: "ID"},
        {key: "email", label: "Email"},
        {key: "role", label: "Vai trò"},
        {
            key: "status",
            label: "Trạng thái",
            render: (value) => userStatusMap[value] || value,
            filterOptions: Object.keys(userStatusMap).map((key) => userStatusMap[key]),
            filterOptionsMap: userStatusMap,
        },
    ];

    const fetchData = async (page, limit, search, filters = {}) => {
        const resolvedFilters = {};
        for (const key in filters) {
            if (key === "status") {
                resolvedFilters[key] = Object.keys(userStatusMap).filter((k) =>
                    filters[key].includes(userStatusMap[k])
                );
            } else {
                resolvedFilters[key] = filters[key];
            }
        }
        const res = await userService.getUsers(page, limit, search, resolvedFilters);
        return {
            data: res.data,
            total: res.total,
        };
    };

    const handleEdit = (row) => {
        navigate(`/users/${row._id}`);
    };

    const handleDelete = async (row) => {
        openConfirm("Xóa", `Bạn có chắc chắn muốn xoá user ${row.email}?`, async () => {
            await userService.deleteUser(row._id);
            toast.success("🗑️ Đã xoá user");
            tableRef.current?.reload();
        });
    };

    const handleDeactivate = async (row) => {
        openConfirm("Khóa tài khoản", `Bạn có muốn khóa tài khoản ${row.email}?`, async () => {
            await userService.deactivateUser(row._id);
            toast.success("🚫 Tài khoản đã bị khóa");
            tableRef.current?.reload();
        });
    };

    const handleReactivate = async (row) => {
        openConfirm("Mở khóa", `Bạn có muốn mở khóa tài khoản ${row.email}?`, async () => {
            await userService.reactivateUser(row._id);
            toast.success("🔁 Tài khoản đã được mở khóa");
            tableRef.current?.reload();
        });
    };

    const getActions = (row) => {
        const actions = [
            {
                label: "Sửa",
                icon: "✏️",
                action: handleEdit,
                className: "btn-edit",
            },
        ];

        if (row.status === "active") {
            actions.push({
                label: "Khóa",
                icon: "🚫",
                action: handleDeactivate,
                className: "btn-deactivate",
            });
        } else if (row.status === "banned") {
            actions.push({
                label: "Mở khóa",
                icon: "🔁",
                action: handleReactivate,
                className: "btn-reactivate",
            });
        }

        actions.push({
            label: "Xoá",
            icon: "🗑️",
            action: handleDelete,
            className: "btn-delete",
        });

        return actions;
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
                actions={getActions}
            />

            {showModal && (
                <PopupModal
                    title={popupConfig.title}
                    message={popupConfig.message}
                    onClose={() => setShowModal(false)}
                    onConfirm={popupConfig.onConfirm}
                />
            )}
        </div>
    );
};

export default Users;
