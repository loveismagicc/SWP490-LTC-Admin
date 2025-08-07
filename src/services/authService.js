import axios from "axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

const rawAxios = axios.create();

export const authService = {
    login: async (email, password) => {
        try {
            const res = await rawAxios.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
            const { accessToken, refreshToken, user } = res.data.data;

            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
            localStorage.setItem(USER_KEY, JSON.stringify(user));

            return res.data.data;
        } catch (err) {
            handleAuthError(err);
        }
    },

    sendForgotPasswordEmail: async (email) => {
        try {
            const res = await rawAxios.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
            return res.data;
        } catch (err) {
            handleAuthError(err);
        }
    },

    resetPassword: async (token, newPassword) => {
        try {
            const res = await rawAxios.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password: newPassword });
            return res.data;
        } catch (err) {
            handleAuthError(err);
        }
    },

    getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
    getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),

    getUser: () => {
        try {
            return JSON.parse(localStorage.getItem(USER_KEY));
        } catch {
            return null;
        }
    },

    setUser: (user) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    clearUser: () => {
        localStorage.removeItem(USER_KEY);
    },

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
            const res = await rawAxios.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });
            const { accessToken } = res.data;

            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            return accessToken;
        } catch (err) {
            console.error("Refresh token failed:", err);
            authService.logout();
            throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        }
    },

    getValidAccessToken: async () => {
        let token = authService.getAccessToken();
        if (authService.isTokenExpired(token)) {
            token = await authService.refreshAccessToken();
        }
        return token;
    },

    isLoggedIn: () => {
        const token = authService.getAccessToken();
        return !!token && !authService.isTokenExpired(token);
    },

    logout: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },
};

// ✅ Hàm xử lý lỗi dùng chung
function handleAuthError(err) {
    if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || "Đã xảy ra lỗi";

        if (status === 401) {
            throw new Error("Sai tên đăng nhập hoặc mật khẩu.");
        } else if (status === 403) {
            throw new Error("Bạn không có quyền truy cập.");
        } else if (status === 400) {
            throw new Error("Dữ liệu không hợp lệ.");
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error("Không thể kết nối đến máy chủ.");
    }
}
