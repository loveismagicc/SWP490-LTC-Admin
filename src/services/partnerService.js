import { apiService } from "./apiService.js";
import { API_ENDPOINTS } from "../constants/apiEndpoints.js";

export const partnerService = {
    register: (formData) =>
        apiService.request({
            url: API_ENDPOINTS.PARTNERS.REGISTER,
            method: "POST",
            data: formData,
            requiresAuth: false
        }),

    approvePartner: (_id) =>
        apiService.request({
            url: API_ENDPOINTS.PARTNERS.APPROVE(_id),
            method: "PATCH",
        }),

    rejectPartner: (_id) =>
        apiService.request({
            url: API_ENDPOINTS.PARTNERS.REJECT(_id),
            method: "PATCH",
        }),

    deactivatePartner: (_id) =>
        apiService.request({
            url: API_ENDPOINTS.PARTNERS.DEACTIVATE(_id),
            method: "PATCH",
        }),

    getPartners: (page, limit, search, resolvedFilters) =>
        apiService.request({
            url: API_ENDPOINTS.PARTNERS.LIST,
            method: "GET",
            params: { page, limit, search, ...resolvedFilters },
        }),
    getPartnerById: (id) =>
        apiService.request({url: API_ENDPOINTS.PARTNERS.DETAIL(id), method: "GET"}),

    createPartner: (data) =>
        apiService.request({
            url: API_ENDPOINTS.PARTNERS.CREATE,
            method: "POST",
            data,
        }),

    updatePartner: (id, data) =>
        apiService.request({
            url: API_ENDPOINTS.PARTNERS.UPDATE(id),
            method: "PUT",
            data,
        }),

    deletePartner: (id) =>
        apiService.request({
            url: API_ENDPOINTS.PARTNERS.DELETE(id),
            method: "DELETE",
        }),
};
