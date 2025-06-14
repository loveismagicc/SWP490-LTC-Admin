import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const chartData = {
  month: [
    { name: "Tháng 1", users: 400 },
    { name: "Tháng 2", users: 300 },
    { name: "Tháng 3", users: 200 },
    { name: "Tháng 4", users: 278 },
    { name: "Tháng 5", users: 189 },
    { name: "Tháng 6", users: 239 },
  ],
  quarter: [
    { name: "Quý 1", users: 900 },
    { name: "Quý 2", users: 750 },
    { name: "Quý 3", users: 820 },
    { name: "Quý 4", users: 910 },
  ],
  year: [
    { name: "2021", users: 3000 },
    { name: "2022", users: 3600 },
    { name: "2023", users: 4100 },
    { name: "2024", users: 4700 },
  ],
};

const UserChart = () => {
  const [filter, setFilter] = useState("month");

  return (
    <div style={{ width: "100%", backgroundColor: "#fff", borderRadius: "10px", padding: "20px", marginTop: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Biểu đồ Người dùng mới</h3>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: "5px 10px", borderRadius: "5px" }}>
          <option value="month">Theo tháng</option>
          <option value="quarter">Theo quý</option>
          <option value="year">Theo năm</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData[filter]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#82ca9d" name="Người dùng mới" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserChart;
