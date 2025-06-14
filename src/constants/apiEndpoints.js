const API_BASE = "http://localhost:8080/api";

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE}/login`,
        REFRESH_TOKEN: `${API_BASE}/refresh-token`,
        LOGOUT: `${API_BASE}/logout`,
    },

    USERS: {
        LIST: `${API_BASE}/users`,
        DETAIL: (id) => `${API_BASE}/users/${id}`,
        CREATE: `${API_BASE}/users`,
        UPDATE: (id) => `${API_BASE}/users/${id}`,
        DELETE: (id) => `${API_BASE}/users/${id}`,
    },

    HOTELS: {
        LIST: `${API_BASE}/hotels`,
        DETAIL: (id) => `${API_BASE}/hotels/${id}`,
        CREATE: `${API_BASE}/hotels`,
        UPDATE: (id) => `${API_BASE}/hotels/${id}`,
        DELETE: (id) => `${API_BASE}/hotels/${id}`,
    },

    TOURS: {
        LIST: `${API_BASE}/tours`,
        DETAIL: (id) => `${API_BASE}/tours/${id}`,
        CREATE: `${API_BASE}/tours`,
        UPDATE: (id) => `${API_BASE}/tours/${id}`,
        DELETE: (id) => `${API_BASE}/tours/${id}`,
    },

    BOOKINGS: {
        LIST: `${API_BASE}/bookings`,
        DETAIL: (id) => `${API_BASE}/bookings/${id}`,
        CREATE: `${API_BASE}/bookings`,
        UPDATE: (id) => `${API_BASE}/bookings/${id}`,
        DELETE: (id) => `${API_BASE}/bookings/${id}`,
    },

    REVENUE: {
        BY_MONTH: `${API_BASE}/revenue/month`,
        BY_QUARTER: `${API_BASE}/revenue/quarter`,
        BY_YEAR: `${API_BASE}/revenue/year`,
    },

    PARTNERS: {
        LIST: `${API_BASE}/partners`,
        DETAIL: (id) => `${API_BASE}/partners/${id}`,
        CREATE: `${API_BASE}/partners`,
        UPDATE: (id) => `${API_BASE}/partners/${id}`,
        DELETE: (id) => `${API_BASE}/partners/${id}`,
    },

    SETTINGS: {
        GET_ALL: `${API_BASE}/settings`,
        UPDATE: `${API_BASE}/settings`,
    },
};
