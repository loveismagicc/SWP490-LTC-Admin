import React, { useRef, useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import { reviewService } from "../../services/reviewService";
import { toast } from "react-toastify";
import "./Reviews.scss";
import PopupModal from "../../components/Popup/PopupModal.jsx";
import { useNavigate } from "react-router-dom";

// Map trạng thái đánh giá
const reviewStatusMap = {
    visible: "Hiển thị",
    hidden: "Đã ẩn",
    pending: "Chờ duyệt",
};

const Reviews = () => {
    const tableRef = useRef();
    const navigate = useNavigate();

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

    // Cấu hình cột bảng
    const columns = [
        { key: "userName", label: "Người dùng" },
        { key: "hotelName", label: "Khách sạn" },
        { key: "rating", label: "Điểm", render: (val) => `⭐ ${val}` },
        { key: "comment", label: "Nội dung" },
        { key: "createdAt", label: "Ngày đánh giá" },
        {
            key: "status",
            label: "Trạng thái",
            render: (value) => reviewStatusMap[value] || value,
            filterOptions: Object.keys(reviewStatusMap).map((k) => reviewStatusMap[k]),
            filterOptionsMap: reviewStatusMap,
        },
    ];

    // Gọi API lấy dữ liệu
    const fetchData = async (page, limit, search, filters = {}) => {
        const resolvedFilters = {};
        for (const key in filters) {
            if (key === "status") {
                resolvedFilters[key] = Object.keys(reviewStatusMap).filter(
                    (k) => filters[key].includes(reviewStatusMap[k])
                );
            } else {
                resolvedFilters[key] = filters[key];
            }
        }

        const res = await reviewService.getReviews(page, limit, search, resolvedFilters);
        return {
            data: res.data,
            total: res.total,
        };
    };

    // Hành động: Duyệt đánh giá
    const handleApprove = async (row) => {
        openConfirm("Duyệt đánh giá", "Bạn có chắc muốn duyệt đánh giá này?", async () => {
            try {
                await reviewService.approveReview(row._id);
                toast.success("✅ Đã duyệt đánh giá");
                tableRef.current?.reload();
            } catch {
                toast.error("❌ Lỗi khi duyệt đánh giá");
            }
        });
    };

    // Hành động: Ẩn/Hiện
    const handleToggleVisibility = async (row) => {
        openConfirm("Ẩn / Hiện", "Bạn có chắc muốn thay đổi hiển thị?", async () => {
            try {
                await reviewService.toggleVisibility(row._id);
                toast.success("👁️ Đã thay đổi hiển thị");
                tableRef.current?.reload();
            } catch {
                toast.error("❌ Lỗi khi thay đổi hiển thị");
            }
        });
    };

    // Hành động: Xoá
    const handleDelete = async (row) => {
        openConfirm("Xoá đánh giá", "Bạn có chắc muốn xoá đánh giá này?", async () => {
            try {
                await reviewService.deleteReview(row._id);
                toast.success("🗑️ Đã xoá đánh giá");
                tableRef.current?.reload();
            } catch {
                toast.error("❌ Lỗi khi xoá đánh giá");
            }
        });
    };

    const handleRowClick = (row) => {
        navigate(`/reviews/${row._id}`); // trang chi tiết review
    };

    const getActions = (row) => {
        const actions = [];

        if (row.status === "pending") {
            actions.push({
                label: "Duyệt",
                icon: "✅",
                action: handleApprove,
                className: "btn-approve",
            });
        }

        actions.push({
            label: "Ẩn / Hiện",
            icon: "👁️",
            action: handleToggleVisibility,
            className: "btn-toggle",
        });

        actions.push({
            label: "Xoá",
            icon: "🗑️",
            action: handleDelete,
            className: "btn-delete",
        });

        return actions;
    };

    return (
        <div>
            <div className="table-header">
                <h2>Quản lý Đánh giá</h2>
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

export default Reviews;
