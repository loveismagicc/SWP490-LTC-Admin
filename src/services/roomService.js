import { apiService } from "./apiService";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const roomService = {
    // Lấy danh sách phòng (toàn bộ)
    getRooms: (page, limit, search, filters = {}) =>
        apiService.request({
            url: API_ENDPOINTS.ROOMS.LIST,
            method: "GET",
            params: {
                page,
                limit,
                search,
                ...filters,
            },
        }),

    // Lấy danh sách phòng theo khách sạn
    getRoomsByHotel: (hotelId, page, limit, search, filters = {}) =>
        apiService.request({
            url: API_ENDPOINTS.ROOMS.LIST_BY_HOTEL(hotelId),
            method: "GET",
            params: {
                page,
                limit,
                search,
                ...filters,
            },
        }),

    // Lấy chi tiết 1 phòng
    getRoomById: (roomId) =>
        apiService.request({
            url: API_ENDPOINTS.ROOMS.DETAIL(roomId),
            method: "GET",
        }),

    // Tạo phòng mới
    createRoom: (data) =>
        apiService.request({
            url: API_ENDPOINTS.ROOMS.CREATE,
            method: "POST",
            data,
        }),

    // Cập nhật phòng
    updateRoom: (roomId, data) =>
        apiService.request({
            url: API_ENDPOINTS.ROOMS.UPDATE(roomId),
            method: "PUT",
            data,
        }),

    // Xoá phòng
    deleteRoom: (roomId) =>
        apiService.request({
            url: API_ENDPOINTS.ROOMS.DELETE(roomId),
            method: "DELETE",
        }),

    // Bật/tắt hiển thị phòng
    toggleVisibility: (roomId) =>
        apiService.request({
            url: API_ENDPOINTS.ROOMS.TOGGLE_VISIBILITY(roomId),
            method: "POST",
        }),
};
