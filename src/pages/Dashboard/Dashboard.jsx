import "./Dashboard.scss";
import UserRevenueChart from "../../components/Charts/UserRevenueChart";
import UserChart from "../../components/Charts/UserChart";


const Dashboard = () => {
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
        <div className="chart-placeholder"><UserRevenueChart /></div>
        <div className="chart-placeholder"><UserChart /></div>
      </div>
    </div>
  );
};

export default Dashboard;
