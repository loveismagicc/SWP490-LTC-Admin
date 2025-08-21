import { useRef, useState } from "react";
import { toast } from "react-toastify";
import DataTable from "../../components/DataTable/DataTable.jsx";
import { bookingService } from "../../services/bookingService.js";

export default function BookingPage() {
    const tableRef = useRef();

    const [filters, setFilters] = useState({
        status: "",
        customerName: "",
    });

    const columns = [
        { key: "paymentInfo.bookingCode", label: "Mã thanh toán" },
        { key: "userId.name", label: "Khách hàng" },
        { key: "details.roomType", label: "Loại phòng" },
        { key: "details.checkInDate", label: "Check In", render: (v) => new Date(v).toLocaleDateString() },
        { key: "details.checkOutDate", label: "Check Out", render: (v) => new Date(v).toLocaleDateString() },
        { key: "totalPrice", label: "Tổng tiền", render: (v) => v.toLocaleString("vi-VN") + " đ" },
        { key: "status", label: "Trạng thái" },
    ];

    const fetchData = async (page, limit, search) => {
        try {
            const res = await bookingService.listBookings(page, limit, search, filters);
            return {
                data: res.data,
                total: res.total,
            };
        } catch (error) {
            toast.error(error.message || "❌ Lỗi tải booking");
            return { data: [], total: 0 };
        }
    };

    const handleFilterChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setTimeout(() => {
            tableRef.current?.reload();
        }, 100);
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Quản lý Booking</h1>

            <div className="filters mb-4 flex gap-2">
                <input
                    type="text"
                    name="customerName"
                    placeholder="Tên khách hàng"
                    value={filters.customerName}
                    onChange={handleFilterChange}
                    className="border px-2 py-1 rounded"
                />
                <input
                    type="text"
                    name="status"
                    placeholder="Trạng thái"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="border px-2 py-1 rounded"
                />
            </div>

            <DataTable
                ref={tableRef}
                columns={columns}
                fetchData={fetchData}
            />
        </div>
    );
}
