import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Cập nhật nếu backend khác cổng
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const authService = {
    login: async (email, password) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/admin/login`, {
                email,
                password,
            });

            const { accessToken, refreshToken } = res.data;
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
            return res.data; // return để FE dùng nếu cần
        } catch (err) {
            throw new Error(err.response?.data?.message || "Đăng nhập thất bại");
        }
    },

    logout: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    },

    getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
    getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),

    isTokenExpired: (token) => {
        if (!token) return true;
        try {
            const [, payloadBase64] = token.split(".");
            const payload = JSON.parse(atob(payloadBase64));
            const now = Math.floor(Date.now() / 1000);
            return payload.exp < now;
        } catch {
            return true;
        }
    },

    refreshAccessToken: async () => {
        const refreshToken = authService.getRefreshToken();
        try {
            const res = await axios.post(`${API_BASE_URL}/api/refresh-token`, {
                refreshToken,
            });
            const { accessToken } = res.data;
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            return accessToken;
        } catch (err) {
            throw new Error(err.response?.data?.message || "Làm mới token thất bại");
        }
    },

    getValidAccessToken: async () => {
        let token = authService.getAccessToken();
        if (authService.isTokenExpired(token)) {
            token = await authService.refreshAccessToken();
        }
        return token;
    },
};
