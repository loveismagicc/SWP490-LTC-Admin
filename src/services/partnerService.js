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

    getPartners: (page, limit, search) =>
        apiService.request({
            url: API_ENDPOINTS.PARTNERS.LIST,
            method: "GET",
            params: { page, limit, search },
        }),
    getPartnerById: (id) =>
        apiService.request({url: API_ENDPOINTS.PARTNERS.DETAIL(id), method: "GET"}),
};
