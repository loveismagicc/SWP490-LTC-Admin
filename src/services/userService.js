import { apiService } from "./apiService";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const userService = {
    getUsers: () =>
        apiService.request({
            url: API_ENDPOINTS.USERS.LIST,
            method: "GET",
        }),

    deleteUser: (id) =>
        apiService.request({
            url: API_ENDPOINTS.USERS.DELETE(id),
            method: "DELETE",
        }),

    createUser: (data) =>
        apiService.request({
            url: API_ENDPOINTS.USERS.CREATE,
            method: "POST",
            data,
        }),
};
