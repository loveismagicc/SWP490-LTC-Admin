import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { partnerService } from "../../../services/partnerService";
import { businessTypeMap } from "../../../utils/enum/businessTypeMap";
import "./PartnerDetailForm.scss";

const PartnerForm = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();

    const [partner, setPartner] = useState({
        companyName: "",
        taxId: "",
        email: "",
        phone: "",
        address: "",
        website: "",
        contactName: "",
        contactPosition: "",
        description: "",
        businessType: "hotel_owner",
    });

    useEffect(() => {
        if (isEdit) {
            partnerService
                .getPartnerById(id)
                .then((data) => {
                    setPartner({
                        companyName: data.companyName,
                        taxId: data.taxId,
                        email: data.email,
                        phone: data.phone,
                        address: data.address,
                        website: data.website,
                        contactName: data.contactName,
                        contactPosition: data.contactPosition,
                        description: data.description,
                        businessType: data.businessType,
                    });
                })
                .catch((err) => {
                    toast.error("❌ Không tìm thấy đối tác!");
                    navigate("/partners");
                });
        }
    }, [id, isEdit, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPartner((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await partnerService.updatePartner(id, partner);
                toast.success("✅ Cập nhật đối tác thành công");
            } else {
                await partnerService.createPartner(partner);
                toast.success("➕ Thêm đối tác thành công");
            }
            navigate("/partners");
        } catch (error) {
            toast.error("❌ Lỗi khi lưu đối tác");
        }
    };

    return (
        <div className="partner-form-page">
            <h2>{isEdit ? "Chỉnh sửa đối tác" : "Thêm đối tác mới"}</h2>
            <form className="partner-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên công ty</label>
                    <input
                        type="text"
                        name="companyName"
                        value={partner.companyName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Mã số thuế</label>
                    <input
                        type="text"
                        name="taxId"
                        value={partner.taxId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={partner.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                        type="text"
                        name="phone"
                        value={partner.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={partner.address}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Website</label>
                    <input
                        type="text"
                        name="website"
                        value={partner.website}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Người liên hệ</label>
                    <input
                        type="text"
                        name="contactName"
                        value={partner.contactName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Chức vụ người liên hệ</label>
                    <input
                        type="text"
                        name="contactPosition"
                        value={partner.contactPosition}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Mô tả</label>
                    <textarea
                        name="description"
                        value={partner.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Loại hình kinh doanh</label>
                    <select
                        name="businessType"
                        value={partner.businessType}
                        onChange={handleChange}
                        required
                    >
                        {Object.entries(businessTypeMap).map(([key, label]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-save">
                    {isEdit ? "💾 Lưu thay đổi" : "➕ Thêm mới"}
                </button>
            </form>
        </div>
    );
};

export default PartnerForm;
