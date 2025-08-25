import React, { useRef, useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import { revenueService } from "../../services/revenueService.js";
import { toast } from "react-toastify";
import "./Revenue.scss";
import PopupModal from "../../components/Popup/PopupModal.jsx";
import { useNavigate } from "react-router-dom";

// map trạng thái thanh toán (có thể chỉnh theo hệ thống của bạn)
const revenueStatusMap = {
    paid: "Đã thanh toán",
    pending: "Chờ thanh toán",
    refunded: "Đã hoàn tiền",
};

const Revenue = () => {
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
        { key: "bookingCode", label: "Mã booking" },
        { key: "partnerName", label: "Đối tác" },
        { key: "hotelName", label: "Khách sạn" },
        { key: "amount", label: "Số tiền (VND)", render: (val) => val?.toLocaleString() },
        { key: "date", label: "Ngày thanh toán" },
        {
            key: "status",
            label: "Trạng thái",
            render: (value) => revenueStatusMap[value] || value,
            filterOptions: Object.keys(revenueStatusMap).map((k) => revenueStatusMap[k]),
            filterOptionsMap: revenueStatusMap,
        },
    ];

    // Gọi API lấy dữ liệu
    const fetchData = async (page, limit, search, filters = {}) => {
        const resolvedFilters = {};
        for (const key in filters) {
            if (key === "status") {
                resolvedFilters[key] = Object.keys(revenueStatusMap).filter(
                    (k) => filters[key].includes(revenueStatusMap[k])
                );
            } else {
                resolvedFilters[key] = filters[key];
            }
        }

        const res = await revenueService.getRevenues(page, limit, search, resolvedFilters);
        return {
            data: res.data,
            total: res.total,
        };
    };

    // Hành động: hoàn tiền
    const handleRefund = async (row) => {
        openConfirm("Hoàn tiền", "Bạn có chắc muốn hoàn tiền giao dịch này?", async () => {
            try {
                await revenueService.refundRevenue(row._id);
                toast.success("💸 Đã hoàn tiền");
                tableRef.current?.reload();
            } catch {
                toast.error("❌ Lỗi khi hoàn tiền");
            }
        });
    };

    const handleRowClick = (row) => {
        navigate(`/revenues/${row._id}`); // xem chi tiết doanh thu
    };

    const getActions = (row) => {
        const actions = [];

        if (row.status === "paid") {
            actions.push({
                label: "Hoàn tiền",
                icon: "💸",
                action: handleRefund,
                className: "btn-refund",
            });
        }

        return actions;
    };

    return (
        <div>
            <div className="table-header">
                <h2>Quản lý Doanh thu</h2>
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

export default Revenue;
