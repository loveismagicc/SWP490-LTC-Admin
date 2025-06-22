import {apiService} from "./apiService";
import {API_ENDPOINTS} from "../constants/apiEndpoints";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const authService = {
    login: async (email, password) => {
        const res = await apiService.request({
            url: API_ENDPOINTS.AUTH.LOGIN,
            method: "POST",
            data: {email, password},
            requiresAuth: false,
        });

        const {accessToken, refreshToken} = res;
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        return res;
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
        const res = await apiService.request({
            url: API_ENDPOINTS.AUTH.REFRESH_TOKEN,
            method: "POST",
            data: {refreshToken},
            requiresAuth: false,
        });
        const {accessToken} = res.data;
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        return accessToken;
    },

    getValidAccessToken: async () => {
        let token = authService.getAccessToken();
        if (authService.isTokenExpired(token)) {
            token = await authService.refreshAccessToken();
        }
        return token;
    },
};
