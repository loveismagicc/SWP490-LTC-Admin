import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { hotelService } from "../../../services/hotelService";
import "./HotelForm.scss";

const statuses = ["pending", "active", "inactive"];

const HotelForm = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();

    const [hotel, setHotel] = useState({
        name: "",
        address: "",
        city: "",
        rating: 3,
        description: "",
        status: "pending",
        images: [],
    });

    useEffect(() => {
        if (isEdit) {
            hotelService
                .getHotelById(id)
                .then((data) =>
                    setHotel({
                        name: data.name || "",
                        address: data.address || "",
                        city: data.city || "",
                        rating: data.rating || 3,
                        description: data.description || "",
                        status: data.status || "pending",
                        images: data.images || [],
                    })
                )
                .catch((err) => {
                    toast.error("❌ Không tìm thấy khách sạn!");
                    navigate("/hotels");
                });
        }
    }, [id, isEdit, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotel((prev) => ({ ...prev, [name]: value }));
    };

    const handleImagesChange = (e) => {
        const value = e.target.value;
        const imageArray = value.split(",").map((url) => url.trim());
        setHotel((prev) => ({ ...prev, images: imageArray }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...hotel };

            if (isEdit) {
                await hotelService.updateHotel(id, payload);
                toast.success("✅ Cập nhật khách sạn thành công");
            } else {
                await hotelService.createHotel(payload);
                toast.success("🆕 Thêm khách sạn thành công");
            }

            navigate("/hotels");
        } catch (error) {
            toast.error("❌ Lỗi khi lưu khách sạn");
        }
    };

    return (
        <div className="hotel-form-page">
            <h2>{isEdit ? "Chỉnh sửa khách sạn" : "Thêm khách sạn mới"}</h2>
            <form className="hotel-form" onSubmit={handleSubmit}>
                {isEdit && (
                    <div className="form-group">
                        <label>ID</label>
                        <input type="text" value={id} disabled />
                    </div>
                )}

                <div className="form-group">
                    <label>Tên khách sạn</label>
                    <input
                        type="text"
                        name="name"
                        value={hotel.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={hotel.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Thành phố</label>
                    <input
                        type="text"
                        name="city"
                        value={hotel.city}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Mô tả</label>
                    <textarea
                        name="description"
                        value={hotel.description}
                        onChange={handleChange}
                        rows={3}
                    />
                </div>

                <div className="form-group">
                    <label>Đánh giá (1-5 sao)</label>
                    <input
                        type="number"
                        name="rating"
                        min="1"
                        max="5"
                        value={hotel.rating}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Trạng thái</label>
                    <select
                        name="status"
                        value={hotel.status}
                        onChange={handleChange}
                        required
                    >
                        {statuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Danh sách ảnh (phân tách bằng dấu phẩy)</label>
                    <input
                        type="text"
                        value={hotel.images.join(", ")}
                        onChange={handleImagesChange}
                        placeholder="https://img1.jpg, https://img2.jpg"
                    />
                </div>

                <button type="submit" className="btn btn-save">
                    {isEdit ? "💾 Lưu thay đổi" : "➕ Thêm mới"}
                </button>
            </form>
        </div>
    );
};

export default HotelForm;
