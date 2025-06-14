import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin</h2>
      <ul>
        <li>
          <NavLink to="/" end>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/users">Quản lý User</NavLink>
        </li>
        <li>
          <NavLink to="/hotels">Quản lý Khách sạn</NavLink>
        </li>
        <li>
          <NavLink to="/tours">Quản lý Tour</NavLink>
        </li>
        <li>
          <NavLink to="/bookings">Quản lý Đơn đặt chỗ</NavLink>
        </li>
        <li>
          <NavLink to="/revenue">Quản lý Doanh thu</NavLink>
        </li>
        <li>
          <NavLink to="/partners">Quản lý Đối tác</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Cấu hình Hệ thống</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
