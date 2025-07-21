import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { roomService } from "../../../services/roomService";
import "./RoomDetailForm.scss";

const RoomDetailForm = () => {
    const { hotelId, roomId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState(null);

    useEffect(() => {
        if (roomId) {
            roomService
                .getRoomById(roomId)
                .then((data) => setForm(data))
                .catch(() => {
                    toast.error("Không tìm thấy phòng");
                    navigate(`/hotels/${hotelId}/rooms`);
                });
        }
    }, [roomId, hotelId, navigate]);

    if (!form) return <div>Đang tải dữ liệu phòng...</div>;

    return (
        <div className="room-form-page">
            <h2>Chi tiết phòng</h2>
            <form className="room-form">
                <div className="form-group">
                    <label>Tên phòng</label>
                    <input name="name" value={form.name} disabled />
                </div>

                <div className="form-group">
                    <label>Mô tả</label>
                    <textarea name="description" value={form.description} disabled />
                </div>

                <div className="form-group">
                    <label>Giá (VNĐ)</label>
                    <input type="number" name="price" value={form.price} disabled />
                </div>

                <div className="form-group">
                    <label>Số lượng</label>
                    <input type="number" name="quantity" value={form.quantity} disabled />
                </div>

                <div className="form-group">
                    <label>Tiện nghi</label>
                    <input
                        type="text"
                        value={form.amenities?.join(", ") || ""}
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label>Ảnh phòng</label>
                    <input
                        type="text"
                        value={form.images?.join(", ") || ""}
                        disabled
                    />
                    <div className="image-preview-list">
                        {form.images?.map((img, index) => (
                            <img key={index} src={img} alt={`img-${index}`} width="80" />
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Trạng thái</label>
                    <select value={form.status} disabled>
                        <option value="active">Hiển thị</option>
                        <option value="inactive">Ẩn</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Chính sách hủy</label>
                    <textarea
                        value={form.policies?.cancellation || ""}
                        disabled
                    />
                </div>
            </form>
        </div>
    );
};

export default RoomDetailForm;
