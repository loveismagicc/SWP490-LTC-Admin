import React from "react";
import "./PopupModal.scss";

const PopupModal = ({ title, message, onConfirm, onClose }) => {
    return (
        <div className="popup-modal">
            <div className="modal-content">
                <h3>{title || "Xác nhận"}</h3>
                <p>{message || "Bạn có chắc chắn không?"}</p>
                <div className="actions">
                    <button className="btn cancel" onClick={onClose}>Hủy</button>
                    <button className="btn confirm" onClick={onConfirm}>Đồng ý</button>
                </div>
            </div>
        </div>
    );
};

export default PopupModal;
