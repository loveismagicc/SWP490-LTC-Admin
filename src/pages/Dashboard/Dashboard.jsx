import "./Dashboard.scss";
import ChartCard from "../../components/Charts/ChartCard.jsx";
import { useEffect, useState } from "react";
import { StatisticService } from "../../services/statisticService.service.js";


const Dashboard = () => {

	const [statistics, setStatistics] = useState({
		totalUsers: 0,
		totalHotels: 0,
		totalBookings: 0,
		todayRevenue: 0,
	});

	const [dataOverview, setDataOverview] = useState(null);
	const [dataByYear, setDataByYear] = useState(null);
	const [dataByMonth, setDataByMonth] = useState(null);
	const [dataByQuarter, setDataByQuarter] = useState(null);

	const getStatistics = async () => {
		const response = await StatisticService.getStatistic();
		if(response) {
			
			setDataOverview(response);
			let totalUsers = response.totalCustomers || 0;
			let totalHotels = response.hotelStatusCount?.reduce((total, item) => {
				return total + (item.count || 0);
			}, 0) || 0;
			let totalBookings = response.totalBookings || 0;
			let todayRevenue = response.todayRevenue || 0;
			console.log(response, "-----> response.data");
			setStatistics({
				totalUsers,
				totalHotels,
				totalBookings,
				todayRevenue,
			});

		}
	};

	useEffect(() => {
		getStatistics();
	}, []);
    // Hàm fetch data mock giả lập API
    const fetchUserChartData = async (filter) => {
		switch (filter) {
			case "month":
				return await StatisticService.getRevenueGroupByMonth();
			case "quarter":
				return  await StatisticService.getRevenueGroupByQuarter();
			case "year":
				return await StatisticService.getRevenueGroupByYear();
		}
    };

	console.log(statistics, "-----> statistics");
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="stats">
                <div className="card">
                    <h3>Tổng người dùng</h3>
                    <p>{statistics?.totalUsers}</p>
                </div>
                <div className="card">
                    <h3>Khách sạn</h3>
                    <p>{statistics?.totalHotels}</p>
                </div>
                <div className="card">
                    <h3>Tổng đơn đặt chỗ</h3>
                    <p>{statistics?.totalBookings}</p>
                </div>
                <div className="card">
                    <h3>Doanh thu hôm nay</h3>
                    <p>{statistics?.todayRevenue}</p>
                </div>
            </div>

            <div className="overview">
                <div className="chart-placeholder">
                    <ChartCard
                        title="Biểu đồ doanh thu"
                        fetchChartData={fetchUserChartData}
                        dataKey="totalRevenue"
                        color="#82ca9d"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
