import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { hotelService } from "../../../services/hotelService";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./HotelForm.scss";

const HotelForm = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        address: "",
        location: {
            type: "Point",
            coordinates: [105.8542, 21.0285], // lng, lat
        },
        rating: 3,
        status: "pending",
        images: [],
        amenities: [],
        additionalInfo: {
            policies: {
                cancellation: "",
                checkInTime: "",
                checkOutTime: "",
                depositRequired: false,
            },
            category: "hotel",
            contact: {
                phone: "",
                email: "",
            },
            payoutPolicy: "monthly",
        },
    });

    useEffect(() => {
        if (isEdit) {
            hotelService
                .getHotelById(id)
                .then((data) => {
					console.log(data);
					setForm(data)
				})
                .catch(() => {
                    toast.error("Không tìm thấy khách sạn");
                    navigate("/hotels");
                });
        }
    }, [id, isEdit, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
				let data = {...form};
				if(data?._id) delete data._id;
                await hotelService.updateHotel(id, data);
                toast.success("Cập nhật khách sạn thành công");
            } else {
                await hotelService.createHotel(form);
                toast.success("Thêm khách sạn thành công");
            }
            navigate("/hotels");
        } catch (err) {
            toast.error("Lỗi xử lý khách sạn");
        }
    };

    const LocationPicker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setForm((prev) => ({
                    ...prev,
                    location: { type: "Point", coordinates: [lng, lat] },
                }));
            },
        });
        return null;
    };

    const markerPosition = [
        form.location.coordinates[1],
        form.location.coordinates[0],
    ];

    return (
        <div className="hotel-form-page">
            <h2>{isEdit ? "Chỉnh sửa khách sạn" : "Thêm khách sạn mới"}</h2>
            <form className="hotel-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên khách sạn</label>
                    <input name="name" value={form.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Mô tả</label>
                    <textarea name="description" value={form.description} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input name="address" value={form.address} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Chọn vị trí trên bản đồ:</label>
                    <MapContainer
                        center={markerPosition}
                        zoom={13}
                        scrollWheelZoom
                        style={{ height: "300px", width: "100%", marginBottom: "1rem" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            position={markerPosition}
                            icon={L.icon({
                                iconUrl:
                                    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                            })}
                        />
                        <LocationPicker />
                    </MapContainer>
                    <small>
                        Tọa độ hiện tại: [{form.location.coordinates[1]}, {form.location.coordinates[0]}]
                    </small>
                </div>

                <div className="form-group">
                    <label>Đánh giá (1 - 5)</label>
                    <input
                        type="number"
                        name="rating"
                        value={form.rating}
                        min={1}
                        max={5}
                        step={0.1}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Tiện nghi (ngăn cách bằng dấu phẩy)</label>
                    <input
                        type="text"
                        value={form.amenities.join(", ")}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                amenities: e.target.value.split(",").map((a) => a.trim()),
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Ảnh khách sạn (URL, cách nhau bởi dấu phẩy)</label>
                    <input
                        type="text"
                        value={form.images.join(", ")}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                images: e.target.value.split(",").map((i) => i.trim()),
                            })
                        }
                    />
                    <div className="image-preview-list">
                        {form.images.map((img, index) => (
                            <img key={index} src={img} alt={`img-${index}`} width="80" />
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Trạng thái</label>
                    <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                    >
                        <option value="pending">Chờ duyệt</option>
                        <option value="active">Hoạt động</option>
                        <option value="inactive">Ẩn</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Loại khách sạn</label>
                    <select
                        value={form.additionalInfo?.category}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                additionalInfo: {
                                    ...form.additionalInfo,
                                    category: e.target.value,
                                },
                            })
                        }
                    >
                        <option value="hotel">Hotel</option>
                        <option value="resort">Resort</option>
                        <option value="homestay">Homestay</option>
                        <option value="guest_house">Guest House</option>
                        <option value="3_star">3 sao</option>
                        <option value="4_star">4 sao</option>
                        <option value="5_star">5 sao</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Chính sách thanh toán</label>
                    <select
                        value={form.additionalInfo?.payoutPolicy}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                additionalInfo: {
                                    ...form.additionalInfo,
                                    payoutPolicy: e.target.value,
                                },
                            })
                        }
                    >
                        <option value="monthly">Hàng tháng</option>
                        <option value="biweekly">Hai tuần</option>
                        <option value="weekly">Hàng tuần</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>SĐT liên hệ</label>
                    <input
                        name="phone"
                        value={form.additionalInfo?.contact?.phone || ""}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                additionalInfo: {
                                    ...form.additionalInfo,
                                    contact: {
                                        ...form.additionalInfo.contact,
                                        phone: e.target.value,
                                    },
                                },
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Email liên hệ</label>
                    <input
                        name="email"
                        value={form.additionalInfo?.contact?.email || ""}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                additionalInfo: {
                                    ...form.additionalInfo,
                                    contact: {
                                        ...form.additionalInfo.contact,
                                        email: e.target.value,
                                    },
                                },
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Chính sách hủy</label>
                    <textarea
                        value={form.additionalInfo?.policies?.cancellation || ""}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                additionalInfo: {
                                    ...form.additionalInfo,
                                    policies: {
                                        ...form.additionalInfo.policies,
                                        cancellation: e.target.value,
                                    },
                                },
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Giờ check-in</label>
                    <input
                        type="time"
                        value={form.additionalInfo?.policies?.checkInTime || ""}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                additionalInfo: {
                                    ...form.additionalInfo,
                                    policies: {
                                        ...form.additionalInfo.policies,
                                        checkInTime: e.target.value,
                                    },
                                },
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Giờ check-out</label>
                    <input
                        type="time"
                        value={form.additionalInfo?.policies?.checkOutTime || ""}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                additionalInfo: {
                                    ...form.additionalInfo,
                                    policies: {
                                        ...form.additionalInfo.policies,
                                        checkOutTime: e.target.value,
                                    },
                                },
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={form.additionalInfo?.policies?.depositRequired || false}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    additionalInfo: {
                                        ...form.additionalInfo,
                                        policies: {
                                            ...form.additionalInfo.policies,
                                            depositRequired: e.target.checked,
                                        },
                                    },
                                })
                            }
                        />
                        &nbsp;Yêu cầu đặt cọc
                    </label>
                </div>

                <button type="submit" className="btn btn-save">
                    {isEdit ? "💾 Lưu thay đổi" : "➕ Thêm mới"}
                </button>
            </form>
        </div>
    );
};

export default HotelForm;
