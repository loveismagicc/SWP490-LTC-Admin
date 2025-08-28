import { apiService } from "./apiService";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const revenueService = {
    // Lấy danh sách doanh thu
    getRevenues: (page, limit, search, filters = {}) =>
        apiService.request({
            url: API_ENDPOINTS.REVENUES.LIST,
            method: "GET",
            params: {
                page,
                limit,
                search,
                ...filters,
            },
        }),

    // Lấy chi tiết một bản ghi doanh thu
    getRevenueById: (revenueId) =>
        apiService.request({
            url: API_ENDPOINTS.REVENUES.DETAIL(revenueId),
            method: "GET",
        }),

    // Xuất báo cáo doanh thu (Excel)
    exportReport: (filters = {}) =>
        apiService.request({
            url: API_ENDPOINTS.REVENUES.EXPORT, // "/revenue/export-excel"
            method: "POST", // backend đang dùng POST
            data: {
                ...filters, // startDate, endDate...
            },
            responseType: "blob", // nhận dữ liệu dạng file
        }),
};
