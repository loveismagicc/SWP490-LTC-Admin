import React from "react";
import "./LoadingSpinner.scss";
import {useLoading} from "../../contexts/LoadingContext.jsx";

const LoadingSpinner = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="loading-overlay">
            <div className="spinner" />
        </div>
    );
};

export default LoadingSpinner;
