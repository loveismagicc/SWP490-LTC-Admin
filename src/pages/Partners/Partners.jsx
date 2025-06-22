import React, {useRef} from "react";
import DataTable from "../../components/DataTable/DataTable";
import { partnerService } from "../../services/partnerService";
import { toast } from "react-toastify";
import "./Partners.scss";
import {partnerStatusMap} from "../../utils/enum/partnerStatusMap.js";
import {businessTypeMap} from "../../utils/enum/businessTypeMap.js";
import {useNavigate} from "react-router-dom";

const Partners = () => {
    const tableRef = useRef();
    const navigate = useNavigate();

    const columns = [
        { key: "companyName", label: "Tên công ty" },
        { key: "taxId", label: "Mã số thuế" },
        { key: "email", label: "Email" },
        { key: "phone", label: "SĐT" },
        { key: "businessType", label: "Loại hình kinh doanh", render: (value) => businessTypeMap[value] || value  },
        { key: "status", label: "Trạng thái", render: (value) => partnerStatusMap[value] || value },
    ];

    const fetchData = async (page, limit, search) => {
        const res = await partnerService.getPartners(page, limit, search);
        return {
            data: res.data,
            total: res.total,
        };
    };

    const handleApprove = async (row) => {
        try {
            await partnerService.approvePartner(row._id);
            toast.success("✅ Đã duyệt đối tác");
            tableRef.current?.reload();
        } catch (err) {
            toast.error("❌ Lỗi khi duyệt đối tác");
        }
    };

    const handleReject = async (row) => {
        try {
            await partnerService.rejectPartner(row._id);
            toast.success("🚫 Đã từ chối đối tác");
            tableRef.current?.reload();
        } catch (err) {
            toast.error("❌ Lỗi khi từ chối đối tác");
        }
    };

    const handleDeactivate = async (row) => {
        try {
            await partnerService.deactivatePartner(row._id);
            toast.success("⛔ Đã hủy kích hoạt đối tác");
            tableRef.current?.reload();
        } catch (err) {
            toast.error("❌ Lỗi khi hủy kích hoạt");
        }
    };

    const getActions = (row) => {
        if (row.status === "pending") {
            return [
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
                },
            ];
        } else if (row.status === "active") {
            return [
                {
                    label: "Hủy kích hoạt",
                    icon: "⛔",
                    action: handleDeactivate,
                    className: "btn-deactivate",
                },
            ];
        }
        return [];
    };

    const handleRowClick = (row) => {
        navigate(`/partners/${row._id}`);
    };

    return (
        <div>
            <div className="table-header">
                <h2>Quản lý đối tác</h2>
            </div>

            <DataTable
                ref={tableRef}
                columns={columns}
                fetchData={fetchData}
                actions={getActions}
                onRowClick={handleRowClick}
            />
        </div>
    );
};

export default Partners;
