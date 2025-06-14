import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export const useAuth = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const validToken = await authService.getValidAccessToken();
                setToken(validToken);
            } catch {
                authService.logout();
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [navigate]);

    return { token, loading };
};
