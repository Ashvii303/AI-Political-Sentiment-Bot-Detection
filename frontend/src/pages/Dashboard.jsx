import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import DashboardChart from "../components/DashboardChart";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
  });

  useEffect(() => {

  const user = localStorage.getItem("user");

  if (!user) {
    navigate("/login");
    return;
  }

  fetchDashboard();

}, [navigate]);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/dashboard");
      setStats(response.data);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };
  

  return (
    <div className="dashboard-page">
      <Sidebar />

      <main className="dashboard-content">

        <div className="dashboard-header">
  <div>
    
    <h1>📊 Dashboard</h1>
    <p>
  Welcome,{" "}
  <strong>
    {JSON.parse(localStorage.getItem("user"))?.name}
  </strong>{" "}
  👋
</p>

<p>
  Monitor political sentiment analysis, bot detection,
  and prediction statistics in real time.
</p>
  </div>
</div>

        <div className="stats-grid">

          <StatCard
            title="Total Analysis"
            value={stats.total}
            color="#2563eb"
          />

          <StatCard
            title="Positive"
            value={stats.positive}
            color="#16a34a"
          />

          <StatCard
            title="Negative"
            value={stats.negative}
            color="#dc2626"
          />

          <StatCard
            title="Neutral"
            value={stats.neutral}
            color="#ea580c"
          />

        </div>

        <DashboardChart />

        

        <footer className="footer">
  <p>© 2026 PolitiSense AI</p>
  <p>AI-Powered Political Sentiment & Bot Detection Platform</p>
</footer>

      </main>
    </div>
  );
}

export default Dashboard;