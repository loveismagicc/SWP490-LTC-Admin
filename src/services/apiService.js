import { toast } from "react-toastify";
import { authService } from "./authService";

export const apiService = {
    request: async ({
                        url,
                        method = "GET",
                        data = null,
                        requiresAuth = true,
                        showLoading = () => {},
                        hideLoading = () => {},
                    }) => {
        try {
            showLoading();

            const token = requiresAuth ? await authService.getValidAccessToken() : null;

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: data ? JSON.stringify(data) : null,
            });

            const contentType = res.headers.get("content-type");
            const isJson = contentType && contentType.includes("application/json");
            const responseData = isJson ? await res.json() : null;

            if (!res.ok) {
                throw new Error(responseData?.message || `Lỗi ${res.status}: ${res.statusText}`);
            }

            return responseData;
        } catch (err) {
            toast.error(err.message || "Đã có lỗi xảy ra");
            throw err;
        } finally {
            hideLoading();
        }
    },
};
