import { useParams } from "react-router-dom";

const EditUser = () => {
    const { id } = useParams();

    return (
        <div>
            <h2>Chỉnh sửa người dùng</h2>
            <p>Đang chỉnh sửa user với ID: {id}</p>
            {/* Thêm form chỉnh sửa ở đây */}
        </div>
    );
};

export default EditUser;
