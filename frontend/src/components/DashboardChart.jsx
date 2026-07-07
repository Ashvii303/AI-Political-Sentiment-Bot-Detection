import { useEffect, useState } from "react";
import api from "../services/api";

import "../styles/DashboardChart.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#16a34a", "#f59e0b", "#ef4444"];

function DashboardChart() {

  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {

      const response = await api.get("/dashboard");

      const history = response.data.history || [];

      const line = history.map((item, index) => ({
        day: index + 1,
        sentiment: item.confidence
      }));

      setLineData(line);

      setPieData([
        {
          name: "Positive",
          value: response.data.positive,
        },
        {
          name: "Neutral",
          value: response.data.neutral,
        },
        {
          name: "Negative",
          value: response.data.negative,
        },
      ]);

    } catch (error) {
      console.log(error);
    }
  };

  if (lineData.length === 0) {
    return (
      <div className="chart-card empty-dashboard">
        <h2>📊 No Analysis Available</h2>
        <p>Start by analyzing political text to view dashboard statistics.</p>
      </div>
    );
  }

  return (
    <div className="chart-grid">

      <div className="chart-card">

        <h3>📈 Political Sentiment Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[0,100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sentiment"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h3>Sentiment Distribution</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DashboardChart;