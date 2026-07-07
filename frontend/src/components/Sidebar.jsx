import "../styles/Sidebar.css";
import {
  FaHome,
  FaSearch,
  FaHistory,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">

      <h2
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        PolitiSense AI
      </h2>

      <nav className="sidebar-menu">

        <a
          className={location.pathname === "/dashboard" ? "active" : ""}
          onClick={() => navigate("/dashboard")}
        >
          <FaHome />
          <span>Dashboard</span>
        </a>

        <a
          className={location.pathname === "/analyze" ? "active" : ""}
          onClick={() => navigate("/analyze")}
        >
          <FaSearch />
          <span>Analyze</span>
        </a>

        <a
          className={location.pathname === "/history" ? "active" : ""}
          onClick={() => navigate("/history")}
        >
          <FaHistory />
          <span>History</span>
        </a>

        <a
          onClick={() =>
            alert("Reports module will be available in the next version.")
          }
        >
          <FaChartBar />
          <span>Reports</span>
        </a>

        <a
          onClick={() =>
            alert("Settings module will be available in the next version.")
          }
        >
          <FaCog />
          <span>Settings</span>
        </a>

      </nav>

      <button
        className="logout-btn"
        onClick={() => {
  localStorage.removeItem("user");
  navigate("/");
}}
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

    </aside>
  );
}

export default Sidebar;