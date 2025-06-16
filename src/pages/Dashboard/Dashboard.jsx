import "./Dashboard.scss";
import ChartCard from "../../components/Charts/ChartCard.jsx";


const Dashboard = () => {
    // Hàm fetch data mock giả lập API
    const fetchUserChartData = async (filter) => {
        await new Promise((r) => setTimeout(r, 300)); // mô phỏng delay API

        const data = {
            month: [
                {name: "Tháng 1", users: 400},
                {name: "Tháng 2", users: 300},
                {name: "Tháng 3", users: 200},
                {name: "Tháng 4", users: 278},
                {name: "Tháng 5", users: 189},
                {name: "Tháng 6", users: 239},
            ],
            quarter: [
                {name: "Quý 1", users: 900},
                {name: "Quý 2", users: 750},
                {name: "Quý 3", users: 820},
                {name: "Quý 4", users: 910},
            ],
            year: [
                {name: "2021", users: 3000},
                {name: "2022", users: 3600},
                {name: "2023", users: 4100},
                {name: "2024", users: 4700},
            ],
        };

        return data[filter];
    };
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="stats">
                <div className="card">
                    <h3>Tổng người dùng</h3>
                    <p>1,245</p>
                </div>
                <div className="card">
                    <h3>Khách sạn</h3>
                    <p>325</p>
                </div>
                <div className="card">
                    <h3>Tổng đơn đặt chỗ</h3>
                    <p>982</p>
                </div>
                <div className="card">
                    <h3>Doanh thu hôm nay</h3>
                    <p>₫ 12,450,000</p>
                </div>
            </div>

            <div className="overview">
                <div className="chart-placeholder">
                    <ChartCard
                        title="Người dùng mới"
                        fetchChartData={fetchUserChartData}
                        dataKey="users"
                        color="#82ca9d"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
