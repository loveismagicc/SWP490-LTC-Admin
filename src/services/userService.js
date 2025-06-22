import {apiService} from "./apiService";
import {API_ENDPOINTS} from "../constants/apiEndpoints";

export const userService = {
    getUsers: (page, limit, search) =>
        apiService.request({
            url: API_ENDPOINTS.USERS.LIST,
            method: "GET",
            params: {page, limit, search}
        }),

    getUserById: (id) =>
        apiService.request({url: API_ENDPOINTS.USERS.DETAIL(id), method: "GET"}),


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

    updateUser: (id, data) =>
        apiService.request({
            url: API_ENDPOINTS.USERS.UPDATE(id),
            method: "POST",
            data,
        }),
};
