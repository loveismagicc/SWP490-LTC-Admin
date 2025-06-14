import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.scss";

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumb">
      <Link to="/">Trang chủ</Link>
      {paths.map((path, index) => {
        const routeTo = "/" + paths.slice(0, index + 1).join("/");
        const label = path
          .replace("-", " ")
          .replace(/^\w/, (c) => c.toUpperCase());

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
