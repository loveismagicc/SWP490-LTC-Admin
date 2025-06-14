import React, { useState } from "react";
import "./Header.scss";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="header-admin">
      <div className="left">
      </div>
      <div className="right">
        <FaBell className="icon bell" />
        <div className="avatar-wrapper" onMouseEnter={() => setOpenMenu(true)} onMouseLeave={() => setOpenMenu(false)}>
          <FaUserCircle className="icon avatar" />
          {openMenu && (
            <div className="dropdown">
              <button onClick={() => alert("Logout!")}>Đăng xuất</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
