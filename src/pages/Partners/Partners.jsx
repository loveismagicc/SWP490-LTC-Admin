import React, { useRef, useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import { partnerService } from "../../services/partnerService";
import { toast } from "react-toastify";
import "./Partners.scss";
import { partnerStatusMap } from "../../utils/enum/partnerStatusMap.js";
import { businessTypeMap } from "../../utils/enum/businessTypeMap.js";
import { useNavigate } from "react-router-dom";
import PopupModal from "../../components/Popup/PopupModal.jsx";

const Partners = () => {
    const tableRef = useRef();
    const navigate = useNavigate();

    const columns = [
        { key: "companyName", label: "Tên công ty" },
        { key: "taxId", label: "Mã số thuế" },
        { key: "email", label: "Email" },
        { key: "phone", label: "SĐT" },
        {
            key: "businessType",
            label: "Loại hình kinh doanh",
            render: (value) => businessTypeMap[value] || value,
            filterOptions: Object.keys(businessTypeMap).map((key) => businessTypeMap[key]),
            filterOptionsMap: businessTypeMap, // 👈 thêm dòng này
        },
        {
            key: "status",
            label: "Trạng thái",
            render: (value) => partnerStatusMap[value] || value,
            filterOptions: Object.keys(partnerStatusMap).map((key) => partnerStatusMap[key]),
            filterOptionsMap: partnerStatusMap, // 👈 thêm dòng này
        },
    ];

    const [showModal, setShowModal] = useState(false);
    const [popupConfig, setPopupConfig] = useState({
        title: "",
        message: "",
        onConfirm: () => {},
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

    const fetchData = async (page, limit, search, filters = {}) => {
        const resolvedFilters = {};
        for (const key in filters) {
            if (key === "businessType") {
                resolvedFilters[key] = Object.keys(businessTypeMap).filter(
                    (k) => filters[key].includes(businessTypeMap[k])
                );
            } else if (key === "status") {
                resolvedFilters[key] = Object.keys(partnerStatusMap).filter(
                    (k) => filters[key].includes(partnerStatusMap[k])
                );
            } else {
                resolvedFilters[key] = filters[key];
            }
        }

        const res = await partnerService.getPartners(page, limit, search, resolvedFilters);
        return {
            data: res.data,
            total: res.total,
        };
    };

    const handleApprove = async (row) => {
        openConfirm("Duyệt", "Bạn có chắc muốn duyệt?", async () => {
            try {
                await partnerService.approvePartner(row._id);
                toast.success("✅ Đã duyệt đối tác");
                tableRef.current?.reload();
            } catch (err) {
                toast.error("❌ Lỗi khi duyệt đối tác");
            }
        });
    };

    const handleReject = async (row) => {
        openConfirm("Từ chối", "Bạn có chắc muốn từ chối?", async () => {
            try {
                await partnerService.rejectPartner(row._id);
                toast.success("🚫 Đã từ chối đối tác");
                tableRef.current?.reload();
            } catch (err) {
                toast.error("❌ Lỗi khi từ chối đối tác");
            }
        });
    };

    const handleDeactivate = async (row) => {
        openConfirm("Hủy kích hoạt", "Bạn có chắc muốn hủy kích hoạt?", async () => {
            try {
                await partnerService.deactivatePartner(row._id);
                toast.success("⛔ Đã hủy kích hoạt đối tác");
                tableRef.current?.reload();
            } catch (err) {
                toast.error("❌ Lỗi khi hủy kích hoạt");
            }
        });
    };

    const handleDelete = async (row) => {
        openConfirm("Xoá đối tác", "Bạn có chắc muốn xoá đối tác này?", async () => {
            try {
                await partnerService.deletePartner(row._id);
                toast.success("🗑️ Đã xoá đối tác");
                tableRef.current?.reload();
            } catch (err) {
                toast.error("❌ Lỗi khi xoá đối tác");
            }
        });
    };


    const getActions = (row) => {
        const actions = [];

        if (row.status === "pending") {
            actions.push(
                {
                    label: "Duyệt",
                    icon: "✅",
                    action: handleApprove,
                    className: "btn-approve",
                },
                {
                    label: "Từ chối",
                    icon: "🚫",
                    action: handleReject,
                    className: "btn-reject",
                }
            );
        } else if (row.status === "active") {
            actions.push({
                label: "Hủy kích hoạt",
                icon: "⛔",
                action: handleDeactivate,
                className: "btn-deactivate",
            });
        }

        // 👉 Thêm hành động xóa
        actions.push({
            label: "Xoá",
            icon: "🗑️",
            action: handleDelete,
            className: "btn-delete",
        });

        return actions;
    };


    const handleRowClick = (row) => {
        navigate(`/partners/${row._id}`);
    };

    return (
        <div>
            <div className="table-header">
                <h2>Quản lý đối tác</h2>
                <button className="btn-add" onClick={() => navigate("/partners/new")}>
                    ➕ Thêm mới
                </button>
            </div>

            <DataTable
                ref={tableRef}
                columns={columns}
                fetchData={fetchData}
                actions={getActions}
                onRowClick={handleRowClick}
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

export default Partners;
