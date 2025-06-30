import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import { authService } from "../../services/authService";

const Sidebar = () => {
  const user = authService.getUser();
  if (!user) return null;

  const role = user.role;

  const menuItems = {
    admin: [
      { to: "/", label: "Dashboard", exact: true },
      { to: "/users", label: "Quản lý User" },
      { to: "/tours", label: "Quản lý Tour" },
      { to: "/hotels", label: "Quản lý Khách sạn" },
      { to: "/partners", label: "Quản lý Đối tác" },
      { to: "/bookings", label: "Quản lý Đơn đặt chỗ" },
      { to: "/revenue", label: "Quản lý Doanh thu" },
      { to: "/settings", label: "Cấu hình Hệ thống" },
    ],
    hotel_owner: [
      { to: "/", label: "Dashboard", exact: true },
      { to: "/hotels", label: "Quản lý Phòng" },
      { to: "/bookings", label: "Quản lý Đơn đặt chỗ" },
    ],
    tour_provider: [
      { to: "/", label: "Dashboard", exact: true },
      { to: "/tours", label: "Quản lý Tour" },
      { to: "/bookings", label: "Quản lý Đơn đặt chỗ" },
      { to: "/revenue", label: "Quản lý Doanh thu" },
    ],
  };

  const items = menuItems[role] || [];

  return (
      <div className="sidebar">
        <h2>{role === "admin" ? "Admin" : "Dashboard"}</h2>
        <ul>
          {items.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.exact}>
                  {item.label}
                </NavLink>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default Sidebar;
