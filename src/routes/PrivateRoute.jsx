import React from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../services/authService";

const PrivateRoute = ({ children, allowedRoles }) => {
    const user = authService.getUser();

    if (!authService.isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default PrivateRoute;
