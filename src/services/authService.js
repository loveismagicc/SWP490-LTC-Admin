const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const authService = {
    login: async (username, password) => {
        const res = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) throw new Error("Đăng nhập thất bại");

        const data = await res.json();
        localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
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
        const res = await fetch("http://localhost:8080/api/refresh-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) throw new Error("Làm mới token thất bại");

        const data = await res.json();
        localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
        return data.accessToken;
    },

    getValidAccessToken: async () => {
        let token = authService.getAccessToken();
        if (authService.isTokenExpired(token)) {
            token = await authService.refreshAccessToken();
        }
        return token;
    },
};
