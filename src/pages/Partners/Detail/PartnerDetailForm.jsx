import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { partnerService } from "../../../services/partnerService";
import { businessTypeMap } from "../../../utils/enum/businessTypeMap";
import { partnerStatusMap } from "../../../utils/enum/partnerStatusMap";
import "./PartnerDetailForm.scss";

const PartnerDetailForm = () => {
    const { id } = useParams();
    const [partner, setPartner] = useState(null);

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const data = await partnerService.getPartnerById(id);
                setPartner(data);
            } catch (err) {
                console.error("Lỗi khi lấy chi tiết partner", err);
            }
        };
        fetchPartner();
    }, [id]);

    if (!partner) return <div>Đang tải dữ liệu...</div>;

    return (
        <div className="partner-detail-form">
            <h2>Chi tiết Đối tác</h2>
            <form>
                <label>Tên công ty:</label>
                <input type="text" value={partner.companyName} disabled />

                <label>Mã số thuế:</label>
                <input type="text" value={partner.taxId} disabled />

                <label>Email:</label>
                <input type="text" value={partner.email} disabled />

                <label>Số điện thoại:</label>
                <input type="text" value={partner.phone} disabled />

                <label>Địa chỉ:</label>
                <input type="text" value={partner.address} disabled />

                <label>Website:</label>
                <input type="text" value={partner.website} disabled />

                <label>Người liên hệ:</label>
                <input type="text" value={partner.contactName} disabled />

                <label>Chức vụ người liên hệ:</label>
                <input type="text" value={partner.contactPosition} disabled />

                <label>Mô tả:</label>
                <textarea value={partner.description} disabled />

                <label>Loại hình kinh doanh:</label>
                <input type="text" value={businessTypeMap[partner.businessType] || partner.businessType} disabled />

                <label>Trạng thái:</label>
                <input type="text" value={partnerStatusMap[partner.status] || partner.status} disabled />
            </form>
        </div>
    );
};

export default PartnerDetailForm;
