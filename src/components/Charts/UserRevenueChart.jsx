import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const chartData = {
  month: [
    { name: "Tháng 1", users: 400, revenue: 24000 },
    { name: "Tháng 2", users: 300, revenue: 22100 },
    { name: "Tháng 3", users: 200, revenue: 22900 },
    { name: "Tháng 4", users: 278, revenue: 20000 },
    { name: "Tháng 5", users: 189, revenue: 21800 },
    { name: "Tháng 6", users: 239, revenue: 25000 },
  ],
  quarter: [
    { name: "Quý 1", users: 900, revenue: 69000 },
    { name: "Quý 2", users: 750, revenue: 66800 },
    { name: "Quý 3", users: 820, revenue: 71000 },
    { name: "Quý 4", users: 910, revenue: 73500 },
  ],
  year: [
    { name: "2021", users: 3000, revenue: 250000 },
    { name: "2022", users: 3600, revenue: 310000 },
    { name: "2023", users: 4100, revenue: 345000 },
    { name: "2024", users: 4700, revenue: 390000 },
  ],
};

const UserRevenueChart = () => {
  const [filter, setFilter] = useState("month");

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#fff", borderRadius: "10px", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Thống kê Doanh thu & Người dùng</h3>
        <select value={filter} onChange={handleChange} style={{ padding: "5px 10px", borderRadius: "5px" }}>
          <option value="month">Theo tháng</option>
          <option value="quarter">Theo quý</option>
          <option value="year">Theo năm</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData[filter]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" name="Doanh thu (₫)" />
          <Bar dataKey="users" fill="#82ca9d" name="Người dùng mới" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserRevenueChart;
