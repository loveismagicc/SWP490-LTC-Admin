import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { roomService } from "../../../services/roomService";
import { hotelService } from "../../../services/hotelService";
import { authService } from "../../../services/authService"; // ✅ dùng authService
import "./RoomDetailForm.scss";

const RoomDetailForm = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const user = authService.getUser(); // ✅ lấy user hiện tại

    const [form, setForm] = useState({
        hotelId: "",
        roomType: "",
        description: "",
        price: 0,
        availability: [],
        amenities: [],
        images: [],
        status: "pending",
        maxPeople: 2,
        area: 0,
    });

    const [quantity, setQuantity] = useState(1);
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load danh sách hotel
    useEffect(() => {
        hotelService
            .getHotels()
            .then((res) => {
                setHotels(res?.data || []);
            })
            .catch(() => toast.error("❌ Không tải được danh sách khách sạn"));
    }, []);

    // Load room khi edit
    useEffect(() => {
        if (roomId) {
            setLoading(true);
            roomService
                .getRoomById(roomId)
                .then((data) => {
                    setForm(data);
                    if (data?.availability?.length > 0) {
                        setQuantity(data.availability[0].quantity);
                    }
                })
                .catch(() => {
                    toast.error("❌ Không tìm thấy phòng");
                    navigate(`/rooms`);
                })
                .finally(() => setLoading(false));
        }
    }, [roomId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleArrayChange = (name, value) => {
        setForm((prev) => ({
            ...prev,
            [name]: value.split(",").map((v) => v.trim()),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!form.hotelId) {
                toast.error("❌ Vui lòng chọn khách sạn");
                return;
            }

            const payload = {
                ...form,
                availability: [
                    {
                        date: new Date(),
                        quantity: Number(quantity),
                    },
                ],
            };

            if (roomId) {
                await roomService.updateRoom(roomId, payload);
                toast.success("✅ Đã cập nhật phòng");
            } else {
                await roomService.createRoom(payload);
                toast.success("✅ Đã thêm phòng mới");
            }
            navigate(`/rooms`);
        } catch {
            toast.error("❌ Lưu thất bại");
        }
    };

    if (loading) return <div>Đang tải dữ liệu phòng...</div>;

    // ✅ nếu không phải hotelOwner thì disable toàn bộ form
    const isEditable = user?.role === "hotel_owner";

    return (
        <div className="room-form-page">
            <h2>{roomId ? "Chỉnh sửa phòng" : "Thêm phòng mới"}</h2>
            <form className="room-form" onSubmit={handleSubmit}>
                {/* Dropdown chọn khách sạn */}
                <div className="form-group">
                    <label>Khách sạn</label>
                    <select
                        name="hotelId"
                        value={form.hotelId}
                        onChange={handleChange}
                        required
                        disabled={!isEditable}
                    >
                        <option value="">-- Chọn khách sạn --</option>
                        {Array.isArray(hotels) &&
                            hotels.map((hotel) => (
                                <option key={hotel._id} value={hotel._id}>
                                    {hotel.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Loại phòng</label>
                    <input
                        name="roomType"
                        value={form.roomType}
                        onChange={handleChange}
                        required
                        disabled={!isEditable}
                    />
                </div>

                <div className="form-group">
                    <label>Mô tả</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </div>

                <div className="form-group">
                    <label>Giá (VNĐ)</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        disabled={!isEditable}
                    />
                </div>

                <div className="form-group">
                    <label>Số lượng</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        disabled={!isEditable}
                    />
                </div>

                <div className="form-group">
                    <label>Số người tối đa</label>
                    <input
                        type="number"
                        name="maxPeople"
                        value={form.maxPeople}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </div>

                <div className="form-group">
                    <label>Diện tích (m²)</label>
                    <input
                        type="number"
                        name="area"
                        value={form.area}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </div>

                <div className="form-group">
                    <label>Tiện nghi (cách nhau dấu phẩy)</label>
                    <input
                        type="text"
                        value={form.amenities?.join(", ") || ""}
                        onChange={(e) =>
                            handleArrayChange("amenities", e.target.value)
                        }
                        disabled={!isEditable}
                    />
                </div>

                <div className="form-group">
                    <label>Ảnh phòng (URL, cách nhau dấu phẩy)</label>
                    <input
                        type="text"
                        value={form.images?.join(", ") || ""}
                        onChange={(e) =>
                            handleArrayChange("images", e.target.value)
                        }
                        disabled={!isEditable}
                    />
                    <div className="image-preview-list">
                        {form.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`img-${index}`}
                                width="80"
                            />
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Trạng thái</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        disabled={!isEditable}
                    >
                        <option value="active">Hiển thị</option>
                        <option value="pending">Chờ duyệt</option>
                        <option value="inactive">Ẩn</option>
                    </select>
                </div>

                {/* ✅ chỉ hiện nút khi là hotelOwner */}
                {isEditable && (
                    <button type="submit" className="save-btn">
                        {roomId ? "Cập nhật" : "Thêm mới"}
                    </button>
                )}
            </form>
        </div>
    );
};

export default RoomDetailForm;
