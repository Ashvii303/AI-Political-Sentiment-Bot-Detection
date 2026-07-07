import { useEffect, useState } from "react";
import axios from "axios";

import "../styles/DashboardPreview.css";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

function DashboardPreview() {
  const [stats, setStats] = useState({
    total: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    history: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/dashboard");
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = stats.history.map((item, index) => ({
    day: index + 1,
    value: item.confidence,
  }));

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h3>Real Analytics</h3>
        <span>Live</span>
      </div>

      <div className="top-cards">

        <div className="small-card">
          <h2>{stats.positive}</h2>
          <p>Positive</p>
        </div>
<div className="small-card">
  <h2>{stats.total}</h2>
  <p>Total Analysis</p>
</div>

<div className="small-card">
  <h2>{stats.negative}</h2>
  <p>Negative</p>
</div>

<div className="small-card">
  <h2>{stats.neutral}</h2>
  <p>Neutral</p>
</div>

      </div>

      <div className="chart">

        <ResponsiveContainer width="100%" height={220}>

          <LineChart data={chartData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="day" />
  <YAxis domain={[0, 100]} />
  <Tooltip />

  <Line
    type="monotone"
    dataKey="value"
    stroke="#2563eb"
    strokeWidth={4}
    dot={{ r: 5 }}
    activeDot={{ r: 8 }}
  />
</LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DashboardPreview;