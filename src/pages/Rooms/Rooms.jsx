import React, { useRef, useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import PopupModal from "../../components/Popup/PopupModal";
import { roomService } from "../../services/roomService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService"; // 👈 import authService
import "./Rooms.scss";

const Rooms = () => {
    const tableRef = useRef();
    const navigate = useNavigate();

    const user = authService.getUser(); // 👈 lấy thông tin user (role, name,...)

    const [filters, setFilters] = useState({
        city: "",
        hotelName: "",
    });

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

    const columns = [
        { key: "name", label: "Tên phòng" },
        { key: "hotelName", label: "Khách sạn" },
        { key: "quantity", label: "Số lượng" },
        { key: "price", label: "Giá (VNĐ)" },
        { key: "amenities", label: "Tiện nghi", render: (val) => val?.join(", ") },
        { key: "status", label: "Trạng thái", render: (val) => (val === "active" ? "Hiển thị" : "Đã ẩn") },
    ];

    const fetchData = async (page, limit, search) => {
        try {
            const res = await roomService.getRooms(page, limit, search, filters);
            return {
                data: res.data,
                total: res.total,
            };
        } catch {
            toast.error("❌ Không thể tải danh sách phòng");
            return { data: [], total: 0 };
        }
    };

    const handleToggleVisibility = async (row) => {
        openConfirm("Ẩn / Hiện phòng", "Bạn có chắc muốn thay đổi trạng thái hiển thị?", async () => {
            try {
                await roomService.toggleVisibility(row._id);
                toast.success("👁️ Đã thay đổi trạng thái phòng");
                tableRef.current?.reload();
            } catch {
                toast.error("❌ Lỗi khi cập nhật trạng thái phòng");
            }
        });
    };

    const handleEditRoom = (row) => {
        navigate(`/hotels/${row.hotelId}/rooms/${row._id}`);
    };

    const getActions = (row) => [
        {
            label: "Sửa",
            icon: "✏️",
            action: handleEditRoom,
        },
        {
            label: "Ẩn / Hiện",
            icon: "👁️",
            action: handleToggleVisibility,
        },
    ];

    const handleFilterChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setTimeout(() => {
            tableRef.current?.reload();
        }, 100);
    };

    const handleAddRoom = () => {
        navigate("/rooms/new");
    };

    return (
        <div className="rooms-page">
            <div className="table-header">
                <h2>Danh sách phòng</h2>

                <div className="filters">
                    <input
                        type="text"
                        name="hotelName"
                        placeholder="Tên khách sạn"
                        value={filters.hotelName}
                        onChange={handleFilterChange}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="Tỉnh / Thành phố"
                        value={filters.city}
                        onChange={handleFilterChange}
                    />
                </div>

                {user?.role === "hotel_owner" && (
                    <button className="add-room-btn" onClick={handleAddRoom}>
                        ➕ Thêm phòng
                    </button>
                )}
            </div>

            <DataTable
                ref={tableRef}
                columns={columns}
                fetchData={fetchData}
                actions={getActions}
                onRowClick={handleEditRoom}
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

export default Rooms;
