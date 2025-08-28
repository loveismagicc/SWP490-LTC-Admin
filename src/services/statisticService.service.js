import { API_ENDPOINTS } from "../constants/apiEndpoints.js";
import { authService } from "./authService.js";
import { apiService } from "./apiService.js"; // 👈 dùng để lấy role & hotelId

export const StatisticService = {
	// ---------------- CRUD ----------------

	getStatistic: async () => {
		return apiService.request({
			url: API_ENDPOINTS.STATISTIC.GET_ALL,
			method: "GET",
		});
	},
	getRevenueGroupByDate: async (filters = {}) => {
		return apiService.request({
			url: API_ENDPOINTS.STATISTIC.REVENUE_GROUP_DATE,
			method: "GET",
			filters,
		});
	},
	getRevenueGroupByMonth: async (filters = {}) => {
		return apiService.request({
			url: API_ENDPOINTS.STATISTIC.REVENUE_GROUP_MONTH,
			method: "GET",
			filters,
		});
	},
	getRevenueGroupByQuarter: async (filters = {}) => {
		return apiService.request({
			url: API_ENDPOINTS.STATISTIC.REVENUE_GROUP_QUARTER,
			method: "GET",
			filters,
		});
	},
	getRevenueGroupByYear: async (filters = {}) => {
		return apiService.request({
			url: API_ENDPOINTS.STATISTIC.REVENUE_GROUP_YEAR,
			method: "GET",
			filters,
		});
	},
};
