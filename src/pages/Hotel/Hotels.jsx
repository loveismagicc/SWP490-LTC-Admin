import React from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable/DataTable";

const Hotels = () => {
    const navigate = useNavigate();

    // Dữ liệu giả lập
    const hotels = [];
    for (let i = 1; i <= 70; i++) {
        hotels.push({
            id: i,
            name: `Khách sạn ${i}`,
            location: `Thành phố ${i % 10}`,
            rating: (Math.random() * 5).toFixed(1),
            price: (500000 + i * 10000).toLocaleString() + "₫",
        });
    }

    const columns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Tên khách sạn" },
        { key: "location", label: "Địa điểm" },
        { key: "rating", label: "Đánh giá ⭐" },
        { key: "price", label: "Giá trung bình / đêm" },
    ];

    const fetchData = async (page, limit, search) => {
        let filtered = hotels;

        if (search) {
            filtered = hotels.filter(
                (hotel) =>
                    hotel.name.toLowerCase().includes(search.toLowerCase()) ||
                    hotel.location.toLowerCase().includes(search.toLowerCase())
            );
        }

        const start = (page - 1) * limit;
        const end = start + limit;

        return {
            data: filtered.slice(start, end),
            total: filtered.length,
        };
    };

    const handleEdit = (id) => navigate(`/hotels/${id}`);
    const handleDelete = (id) => alert(`Xoá khách sạn ID: ${id}`);
    const handleRowClick = (row) => navigate(`/hotels/${row.id}`);

    return (
        <div>
            <div className="table-header">
                <h2>Danh sách Khách Sạn</h2>
                <button className="btn-add" onClick={() => navigate("/hotels/new")}>
                    ➕ Thêm mới
                </button>
            </div>
            <DataTable
                columns={columns}
                fetchData={fetchData}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRowClick={handleRowClick}
            />
        </div>
    );
};

export default Hotels;
