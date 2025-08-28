import React, { useEffect, useRef, useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import { hotelService } from "../../services/hotelService";
import { toast } from "react-toastify";
import "./Hotels.scss";
import PopupModal from "../../components/Popup/PopupModal.jsx";
import { useNavigate } from "react-router-dom";
import { hotelStatusMap } from "../../utils/enum/hotelStatusMap"; // tạo map giống partnerStatusMap
import { partnerService } from "../../services/partnerService.js";
import { FormSelect } from "react-bootstrap";

const componentsSearch = ({ filters, handleFilterChange, owners }) => {
	return (
		<div className="d-flex gap-4">
			<div className="form-group w-25">
				<input
					type="text"
					name="address"
					placeholder="Địa chỉ"
					value={filters.address}
					onChange={handleFilterChange}
					className=" form-control form-control-lg"
				/>
			</div>
			<div className="form-group w-25">
				<FormSelect
					name="ownerId"
					value={filters.ownerId}
					onChange={handleFilterChange}
					className="form-control form-control-lg"
				>
					<option value="">Tất cả </option>
					{owners.map((o) => (
						<option key={o._id} value={o._id}>
							{o.companyName}
						</option>
					))}
				</FormSelect>
			</div>
		</div>
	);
};
const Hotels = () => {
    const tableRef = useRef();
    const navigate = useNavigate();

	const [owners, setOwners] = useState([]);

    const columns = [
        { key: "name", label: "Tên khách sạn" },
        { key: "address", label: "Địa chỉ" },
        {
            key: "status",
            label: "Trạng thái",
            render: (value) => hotelStatusMap[value] || value,
            filterOptions: Object.keys(hotelStatusMap).map((key) => hotelStatusMap[key]),
            filterOptionsMap: hotelStatusMap,
        },
    ];

    const [showModal, setShowModal] = useState(false);
    const [popupConfig, setPopupConfig] = useState({
        title: "",
        message: "",
        onConfirm: () => {},
    });
	const [filters, setFilters] = useState({
		ownerId: "",
		address: "",
	});

	useEffect(() => {
		fetchDataOwner();
	}, [])

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

    const fetchData = async (page, limit, search, filterStatus = {}) => {
        const resolvedFilters = {};
        for (const key in filterStatus) {
            if (key === "status") {
                resolvedFilters[key] = Object.keys(hotelStatusMap).filter(
                    (k) => filterStatus[key].includes(hotelStatusMap[k])
                );
            } else {
                resolvedFilters[key] = filterStatus[key];
            }
        }
		console.log(filters);
        const res = await hotelService.getHotels(page, limit, search, {...resolvedFilters, ...filters});
        return {
            data: res.data,
            total: res.total,
        };
    };

	const fetchDataOwner = async () => {
        const res = await partnerService.getPartners(1, 1000, "");
		console.log(res?.data);
		setOwners(res?.data || []);
    };

    const handleApprove = async (row) => {
        openConfirm("Duyệt", "Bạn có chắc muốn duyệt khách sạn này?", async () => {
            try {
                await hotelService.approveHotel(row._id);
                toast.success("✅ Đã duyệt khách sạn");
                tableRef.current?.reload();
            } catch {
                toast.error("❌ Lỗi khi duyệt khách sạn");
            }
        });
    };

    const handleReject = async (row) => {
        openConfirm("Từ chối", "Bạn có chắc muốn từ chối khách sạn này?", async () => {
            try {
                await hotelService.rejectHotel(row._id);
                toast.success("🚫 Đã từ chối khách sạn");
                tableRef.current?.reload();
            } catch {
                toast.error("❌ Lỗi khi từ chối khách sạn");
            }
        });
    };

    const handleToggleVisibility = async (row) => {
        openConfirm("Ẩn / Hiện", "Bạn có chắc muốn thay đổi trạng thái hiển thị?", async () => {
            try {
                await hotelService.toggleVisibility(row._id);
                toast.success("👁️ Đã thay đổi trạng thái hiển thị");
                tableRef.current?.reload();
            } catch {
                toast.error("❌ Lỗi khi cập nhật hiển thị");
            }
        });
    };

    const handleRowClick = (row) => {
		console.log(row);
        navigate(`/hotels/${row._id}`);
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
            actions.push({
                label: "Từ chối",
                icon: "🚫",
                action: handleReject,
                className: "btn-reject",
            });
        }

        actions.push({
            label: "Ẩn / Hiện",
            icon: "👁️",
            action: handleToggleVisibility,
            className: "btn-toggle",
        });

        return actions;
    };
	const handleFilterChange = (e) => {
		setFilters((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
		console.log("e.target.value--------> ", e.target.value);
		setTimeout(() => {
			tableRef.current?.reload();
		}, 300);
	};

    return (
        <div>
            <div className="table-header">
                <h2>Quản lý khách sạn</h2>
                <button className="btn-add" onClick={() => navigate("/hotels/new")}>
                    ➕ Thêm mới
                </button>
            </div>

            <DataTable
                ref={tableRef}
                columns={columns}
                fetchData={fetchData}
                actions={getActions}
                onRowClick={handleRowClick}
				componentsSearch={componentsSearch({ filters, handleFilterChange, owners })}
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

export default Hotels;
