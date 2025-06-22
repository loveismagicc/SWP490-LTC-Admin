import { toast } from "react-toastify";
import { authService } from "./authService.js";

const makeRequest = async ({
                               url,
                               method = "GET",
                               data = null,
                               params = null,
                               requiresAuth = true,
                               showLoading = () => {},
                               hideLoading = () => {},
                           }) => {
    try {
        showLoading();

        const token = requiresAuth ? await authService.getValidAccessToken() : null;
        const isFormData = typeof FormData !== "undefined" && data instanceof FormData;

        const headers = {
            ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
            ...(!isFormData ? { "Content-Type": "application/json" } : {}),
        };

        // Xử lý query string
        if (params && typeof params === "object") {
            const queryString = new URLSearchParams(params).toString();
            url += (url.includes("?") ? "&" : "?") + queryString;
        }

        const res = await fetch(url, {
            method,
            headers,
            body: method !== "GET" && data
                ? (isFormData ? data : JSON.stringify(data))
                : null,
        });

        const contentType = res.headers.get("content-type") || "";
        const isJson = contentType.includes("application/json");
        const responseData = isJson ? await res.json() : null;
        const rawText = !isJson ? await res.text() : null;

        if (!res.ok || (responseData && responseData.success === false)) {
            const message = responseData?.message || rawText || `Lỗi ${res.status}: ${res.statusText}`;
            toast.error(message);
            console.error("API Error:", { url, method, data, responseData, rawText });
            throw new Error(message);
        }

        return responseData?.data || responseData;
    } catch (err) {
        console.error("Unhandled API error:", err);
        throw err;
    } finally {
        hideLoading();
    }
};

// Public API
export const apiService = {
    request: makeRequest,

    get: (url, params = {}, options = {}) =>
        makeRequest({ url, method: "GET", params, ...options }),

    post: (url, data = {}, options = {}) =>
        makeRequest({ url, method: "POST", data, ...options }),

    put: (url, data = {}, options = {}) =>
        makeRequest({ url, method: "PUT", data, ...options }),

    patch: (url, data = {}, options = {}) =>
        makeRequest({ url, method: "PATCH", data, ...options }),

    delete: (url, data = {}, options = {}) =>
        makeRequest({ url, method: "DELETE", data, ...options }),
};
