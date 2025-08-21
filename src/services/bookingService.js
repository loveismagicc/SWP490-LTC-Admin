import { API_ENDPOINTS } from "../constants/apiEndpoints.js";
import { authService } from "./authService";
import {apiService} from "./apiService.js"; // 👈 dùng để lấy role & hotelId

export const bookingService = {
    // ---------------- CRUD ----------------

    createBooking: (data) =>
        apiService.request({
            url: API_ENDPOINTS.BOOKINGS.CREATE,
            method: "POST",
            data,
        }),

    getBookings: (page, limit, search, filters = {}) =>
        apiService.request({
            url: API_ENDPOINTS.BOOKINGS.LIST,
            method: "GET",
            params: {
                page,
                limit,
                search,
                ...filters,
            },
        }),

    getBookingById: (id) =>
        apiService.request({
            url: API_ENDPOINTS.BOOKINGS.DETAIL(id),
            method: "GET",
        }),

    getBookingsByUser: (userId) =>
        apiService.request({
            url: API_ENDPOINTS.BOOKINGS.BY_USER(userId),
            method: "GET",
        }),

    getBookingsByHotel: (hotelId, page, limit, search, filters = {}) =>
        apiService.request({
            url: API_ENDPOINTS.BOOKINGS.BY_HOTEL(hotelId),
            method: "GET",
            params: {
                page,
                limit,
                search,
                ...filters,
            },
        }),

    updateBooking: (id, data) =>
        apiService.request({
            url: API_ENDPOINTS.BOOKINGS.DETAIL(id),
            method: "PUT",
            data,
        }),

    deleteBooking: (id) =>
        apiService.request({
            url: API_ENDPOINTS.BOOKINGS.DETAIL(id),
            method: "DELETE",
        }),

    // ---------------- Helper ----------------
    /**
     * Hàm động: tự lấy booking theo role
     * - Admin => tất cả
     * - Hotel Owner => theo hotelId
     */
    listBookings: async (page, limit, search, filters = {}) => {
        const user = authService.getUser(); // { role, hotelId }

        if (user?.role === "admin") {
            return await bookingService.getBookings(page, limit, search, filters);
        }

        if (user?.role === "hotel_owner" && user?.hotelId) {
            return await bookingService.getBookingsByHotel(user.hotelId, page, limit, search, filters);
        }

        // fallback: return rỗng
        return { data: [], total: 0 };
    },
};
