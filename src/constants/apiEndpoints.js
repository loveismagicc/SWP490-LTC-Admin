const API_BASE = "http://localhost:5000/api";

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE}/login`,
        REFRESH_TOKEN: `${API_BASE}/login/refresh-token`,
        LOGOUT: `${API_BASE}/logout`,
    },

    USERS: {
        LIST: `${API_BASE}/user`,
        DETAIL: (id) => `${API_BASE}/user/${id}`,
        CREATE: `${API_BASE}/user`,
        UPDATE: (id) => `${API_BASE}/user/${id}`,
        DELETE: (id) => `${API_BASE}/user/${id}`,
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
        LIST: `${API_BASE}/partner`,
        APPROVE: (id) => `${API_BASE}/partner/approve/${id}`,
        REJECT: (id) => `${API_BASE}/partner/reject/${id}`,
        DEACTIVATE: (id) => `${API_BASE}/partner/de-activate/${id}`,
        DETAIL: (id) => `${API_BASE}/partner/${id}`,
        CREATE: `${API_BASE}/partner`,
        REGISTER: `${API_BASE}/partner/register`,
        UPDATE: (id) => `${API_BASE}/partner/${id}`,
    },

    SETTINGS: {
        GET_ALL: `${API_BASE}/settings`,
        UPDATE: `${API_BASE}/settings`,
    },
};
