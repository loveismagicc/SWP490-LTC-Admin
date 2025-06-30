import axios from "axios";
import { toast } from "react-toastify";
import { authService } from "./authService";

const axiosInstance = axios.create({
    baseURL: "",
    timeout: 15000,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await authService.getValidAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (
            config.data &&
            typeof config.data === "object" &&
            !(config.data instanceof FormData)
        ) {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => {
        toast.error("❌ Lỗi gửi request.");
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data?.success === false) {
            const msg = response.data.message || "❌ Lỗi từ máy chủ";
            toast.error(msg);
            throw new Error(msg);
        }
        return response.data?.data ?? response.data;
    },
    (error) => {
        let msg = "🚨 Đã xảy ra lỗi không xác định.";

        if (error.response) {
            const { status, data } = error.response;

            if (data?.message) msg = data.message;
            else if (status === 400) msg = "🚫 Yêu cầu không hợp lệ (400)";
            else if (status === 401) {
                msg = "🔒 Phiên đăng nhập hết hạn";
                authService.logout();
                window.location.href = "/login";
            } else if (status === 403) msg = "⛔ Không có quyền truy cập";
            else if (status === 404) msg = "🔍 Không tìm thấy (404)";
            else if (status >= 500) msg = "💥 Lỗi máy chủ";
            else msg = `❌ Lỗi ${status}`;
        } else if (error.request) {
            msg = "🌐 Không thể kết nối đến máy chủ";
        } else if (error.message) {
            msg = error.message;
        }

        toast.error(msg);
        return Promise.reject(error);
    }
);

const safeCall = async (axiosMethod, ...args) => {
    try {
        return await axiosMethod(...args);
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const apiService = {
    request: ({ url, method = "GET", data = {}, params = {}, config = {} }) =>
        safeCall(axiosInstance.request, {
            url,
            method,
            data,
            params,
            ...config,
        }),

    get: (url, params = {}, config = {}) =>
        safeCall(axiosInstance.get, url, { params, ...config }),

    post: (url, data = {}, config = {}) =>
        safeCall(axiosInstance.post, url, data, config),

    put: (url, data = {}, config = {}) =>
        safeCall(axiosInstance.put, url, data, config),

    patch: (url, data = {}, config = {}) =>
        safeCall(axiosInstance.patch, url, data, config),

    delete: (url, config = {}) =>
        safeCall(axiosInstance.delete, url, config),

    raw: axiosInstance,
};
