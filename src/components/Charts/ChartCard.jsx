import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import "./ChartCard.scss";

const ChartCard = ({ title, fetchChartData, dataKey = "totalRevenue", color = "#82ca9d" }) => {
    const [filter, setFilter] = useState("month");
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchChartData(filter);
                setChartData(data);
				console.log("data", data);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu biểu đồ:", err);
            }
        };
        loadData();
    }, [filter]);

    // ✅ Xác định key theo filter nếu dataKey là object
    const resolvedKey = typeof dataKey === "object" ? dataKey[filter] : dataKey;

    return (
        <div className="chart-card">
            <div className="chart-header">
                <h3>{title}</h3>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="month">Theo tháng</option>
                    <option value="quarter">Theo quý</option>
                    <option value="year">Theo năm</option>
                </select>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey={resolvedKey}
                        stroke={color}
                        name={title}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartCard;
