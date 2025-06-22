import {apiService} from "./apiService.js";
import {API_ENDPOINTS} from "../constants/apiEndpoints.js";

export const partnerService = {
    register: (formData) =>
        apiService.request({
            url: API_ENDPOINTS.PARTNERS.REGISTER,
            method: "POST",
            data: formData,
            requiresAuth: false
        }),

};
