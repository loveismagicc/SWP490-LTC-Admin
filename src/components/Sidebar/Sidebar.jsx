import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Hotel,
  Briefcase,
  CalendarCheck2,
  BarChart2,
  Settings,
  Star,
  Building2,
  FileText,
} from "lucide-react";

import "./Sidebar.scss";
import { authService } from "../../services/authService";

const Sidebar = () => {
  const user = authService.getUser();
  if (!user) return null;

  const role = user.role;

  const menuItems = {
    admin: [
      {
        title: "Tổng quan",
        items: [
          { to: "/", label: "Dashboard", icon: <LayoutDashboard size={18} />, exact: true },
          { to: "/dashboard/conversion", label: "Tỷ lệ chuyển đổi", icon: <BarChart2 size={18} /> },
          { to: "/dashboard/top-hotels", label: "Top khách sạn", icon: <Building2 size={18} /> },
        ],
      },
      {
        title: "Quản lý hệ thống",
        items: [
          { to: "/users", label: "Người dùng", icon: <Users size={18} /> },
          { to: "/partners", label: "Đối tác", icon: <Briefcase size={18} /> },
          { to: "/hotels", label: "Khách sạn", icon: <Hotel size={18} /> },
          { to: "/bookings", label: "Đơn đặt chỗ", icon: <CalendarCheck2 size={18} /> },
          { to: "/revenue", label: "Doanh thu", icon: <BarChart2 size={18} /> },
          { to: "/reviews", label: "Đánh giá", icon: <Star size={18} /> },
          { to: "/settings", label: "Cấu hình", icon: <Settings size={18} /> },
        ],
      },
    ],

    hotel_owner: [
      {
        title: "Chủ khách sạn",
        items: [
          { to: "/", label: "Dashboard", icon: <LayoutDashboard size={18} />, exact: true },
          { to: "/rooms", label: "Phòng", icon: <Hotel size={18} /> },
          { to: "/bookings", label: "Đơn đặt chỗ", icon: <CalendarCheck2 size={18} /> },
        ],
      },
    ],

    tour_provider: [
      {
        title: "Nhà cung cấp tour",
        items: [
          { to: "/", label: "Dashboard", icon: <LayoutDashboard size={18} />, exact: true },
          { to: "/tours", label: "Tour", icon: <FileText size={18} /> },
          { to: "/bookings", label: "Đơn đặt chỗ", icon: <CalendarCheck2 size={18} /> },
          { to: "/revenue", label: "Doanh thu", icon: <BarChart2 size={18} /> },
        ],
      },
    ],
  };

  const sections = menuItems[role] || [];

  return (
      <aside className="sidebar">
        <div className="sidebar__logo">
          🏨 MyAdmin
        </div>
        <div className="sidebar__menu">
          {sections.map((section, idx) => (
              <div key={idx} className="sidebar__section">
                <p className="sidebar__title">{section.title}</p>
                <ul>
                  {section.items.map((item) => (
                      <li key={item.to}>
                        <NavLink
                            to={item.to}
                            end={item.exact}
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </NavLink>
                      </li>
                  ))}
                </ul>
              </div>
          ))}
        </div>
      </aside>
  );
};

export default Sidebar;
