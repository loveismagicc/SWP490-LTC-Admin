import { apiService } from "./apiService.js";
import { API_ENDPOINTS } from "../constants/apiEndpoints.js";

export const hotelService = {
    getHotels: (page, limit, search, resolvedFilters) =>
        apiService.request({
            url: API_ENDPOINTS.HOTELS.LIST,
            method: "GET",
            params: { page, limit, search, ...resolvedFilters },
        }),

    getHotelById: (id) =>
        apiService.request({
            url: API_ENDPOINTS.HOTELS.DETAIL(id),
            method: "GET",
        }),

    approveHotel: (id) =>
        apiService.request({
            url: API_ENDPOINTS.HOTELS.APPROVE(id),
            method: "PATCH",
        }),

    rejectHotel: (id) =>
        apiService.request({
            url: API_ENDPOINTS.HOTELS.REJECT(id),
            method: "PATCH",
        }),

    toggleVisibility: (id) =>
        apiService.request({
            url: API_ENDPOINTS.HOTELS.TOGGLE_VISIBILITY(id),
            method: "PATCH",
        }),

    updateHotel: (id, data) =>
        apiService.request({
            url: API_ENDPOINTS.HOTELS.UPDATE(id),
            method: "PUT",
            data,
        }),

    updateHotelImages: (id, images) =>
        apiService.request({
            url: API_ENDPOINTS.HOTELS.UPDATE_IMAGES(id),
            method: "PATCH",
            data: { images },
        }),

    deleteHotel: (id) =>
        apiService.request({
            url: API_ENDPOINTS.HOTELS.DELETE(id),
            method: "DELETE",
        }),
    createHotel: (data) =>
        apiService.request({
            url: API_ENDPOINTS.HOTELS.CREATE,
            method: "POST",
            data,
        }),
};
