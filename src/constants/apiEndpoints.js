const API_BASE = import.meta.env.VITE_API_BASE;

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
        DEACTIVATE: (id) => `${API_BASE}/user/de-activate/${id}`,
        REACTIVATE: (id) => `${API_BASE}/user/re-activate/${id}`,
    },

    HOTELS: {
        LIST: `${API_BASE}/hotel`,
        CREATE: `${API_BASE}/hotel`,
        DETAIL: (id) => `${API_BASE}/hotel/${id}`,
        APPROVE: (id) => `${API_BASE}/hotel/${id}/approve`,
        REJECT: (id) => `${API_BASE}/hotel/${id}/reject`,
        TOGGLE_VISIBILITY: (id) => `${API_BASE}/hotel/${id}/toggle-visibility`,
        UPDATE: (id) => `${API_BASE}/hotel/${id}`,
        UPDATE_IMAGES: (id) => `${API_BASE}/hotels/${id}/images`,
        DELETE: (id) => `${API_BASE}/hotel/${id}`,
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
        DELETE: (id) => `${API_BASE}/partner/${id}`,
    },

    SETTINGS: {
        GET_ALL: `${API_BASE}/settings`,
        UPDATE: `${API_BASE}/settings`,
    },
};
