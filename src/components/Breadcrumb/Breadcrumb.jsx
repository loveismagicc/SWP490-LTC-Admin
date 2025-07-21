import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.scss";

const pathNameMap = {
  users: "Người dùng",
  hotels: "Khách sạn",
  tours: "Tour",
  bookings: "Đặt chỗ",
  revenue: "Doanh thu",
  partners: "Đối tác",
  settings: "Cấu hình",
  edit: "Chỉnh sửa",
  create: "Tạo mới",
  dashboard: "Dashboard",
  rooms: "Phòng",
};

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((x) => x);

  return (
      <div className="breadcrumb">
        <Link to="/">Trang chủ</Link>
        {paths.map((path, index) => {
          const routeTo = "/" + paths.slice(0, index + 1).join("/");

          const label =
              pathNameMap[path] || // nếu có trong map thì lấy
              (isNaN(path) ? // nếu không thì kiểm tra có phải số ID không
                  path.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase()) :
                  `Chi tiết`);

          return (
              <span key={index}>
            {" > "}
                <Link to={routeTo}>{label}</Link>
          </span>
          );
        })}
      </div>
  );
};

export default Breadcrumb;
