// pages/Hotels/HotelForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./HotelForm.scss";

const HotelForm = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();

    const [hotel, setHotel] = useState({
        name: "",
        address: "",
        rating: 3,
    });

    useEffect(() => {
        if (isEdit) {
            // Giả lập dữ liệu hotel
            const fakeHotel = {
                id,
                name: `Hotel ${id}`,
                address: `Địa chỉ ${id}`,
                rating: (parseInt(id) % 5) + 1,
            };
            setHotel(fakeHotel);
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        setHotel({ ...hotel, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            alert(`✔️ Đã cập nhật khách sạn: ${hotel.name}`);
        } else {
            alert(`🆕 Đã thêm mới khách sạn: ${hotel.name}`);
        }

        navigate("/hotels");
    };

    return (
        <div className="hotel-form-page">
            <h2>{isEdit ? "Chỉnh sửa khách sạn" : "Thêm khách sạn mới"}</h2>
            <form className="hotel-form" onSubmit={handleSubmit}>
                <label>
                    Tên khách sạn
                    <input
                        type="text"
                        name="name"
                        value={hotel.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Địa chỉ
                    <input
                        type="text"
                        name="address"
                        value={hotel.address}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Đánh giá (1-5 sao)
                    <input
                        type="number"
                        name="rating"
                        min="1"
                        max="5"
                        value={hotel.rating}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit" className="btn-save">
                    {isEdit ? "Lưu thay đổi" : "Thêm mới"}
                </button>
            </form>
        </div>
    );
};

export default HotelForm;
