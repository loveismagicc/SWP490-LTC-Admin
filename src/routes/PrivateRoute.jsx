import React from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../services/authService";

const PrivateRoute = ({ children }) => {
    const token = authService.getAccessToken();

    if (!token || authService.isTokenExpired(token)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
