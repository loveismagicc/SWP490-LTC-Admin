import React, { useState } from "react";
import "./RegisterPartner.scss";
import { useNavigate } from "react-router-dom";
import { partnerService } from "../../../services/partnerService.js";
import { toast } from "react-toastify";

const RegisterPartner = () => {
    const [form, setForm] = useState({
        companyName: "",
        taxId: "",
        email: "",
        phone: "",
        address: "",
        website: "",
        contactName: "",
        contactPosition: "",
        description: "",
        businessType: "",
    });
    const [licenseFile, setLicenseFile] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setLicenseFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => data.append(key, value));
        if (licenseFile) {
            data.append("licenseFile", licenseFile);
        }

        try {
            await partnerService.register(data);
            toast.success(
                "Đăng ký thành công! Admin sẽ xét duyệt trong thời gian sớm nhất."
            );
            setForm({
                companyName: "",
                taxId: "",
                email: "",
                phone: "",
                address: "",
                website: "",
                contactName: "",
                contactPosition: "",
                description: "",
                businessType: "",
            });
            setLicenseFile(null);
        } catch (err) {
            toast.error("Đăng ký thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <div className="register-partner-wrapper">
            <form className="register-partner-form" onSubmit={handleSubmit}>
                <h2>Đăng ký Đối tác Kinh doanh Du lịch</h2>

                <input
                    type="text"
                    name="companyName"
                    placeholder="Tên công ty *"
                    value={form.companyName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="taxId"
                    placeholder="Mã số thuế *"
                    value={form.taxId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Địa chỉ trụ sở *"
                    value={form.address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email liên hệ *"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Số điện thoại *"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="website"
                    placeholder="Website công ty"
                    value={form.website}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="contactName"
                    placeholder="Người liên hệ *"
                    value={form.contactName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="contactPosition"
                    placeholder="Chức vụ người liên hệ"
                    value={form.contactPosition}
                    onChange={handleChange}
                />

                <select
                    name="businessType"
                    value={form.businessType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Chọn loại hình kinh doanh *</option>
                    <option value="hotel">Khách sạn</option>
                    <option value="tour">Tour du lịch</option>
                    <option value="flight">Vé máy bay</option>
                    <option value="transport">Vận chuyển</option>
                    <option value="restaurant">Nhà hàng</option>
                    <option value="other">Khác</option>
                </select>

                <textarea
                    name="description"
                    placeholder="Mô tả dịch vụ, thông tin thêm..."
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                />

                <label className="file-label">Giấy phép kinh doanh (PDF/JPG/PNG):</label>
                <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={handleFileChange}
                    required
                />

                <button type="submit">Gửi đăng ký</button>
            </form>
        </div>
    );
};

export default RegisterPartner;
