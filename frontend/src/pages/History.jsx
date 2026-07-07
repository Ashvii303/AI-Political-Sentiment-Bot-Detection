import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/History.css";
import Sidebar from "../components/Sidebar";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/history");
      setHistory(response.data.reverse());
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const clearHistory = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to clear all history?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete("http://127.0.0.1:5000/clear_history");
      setHistory([]);
    } catch (error) {
      alert("Unable to clear history.");
    }
  };

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSentiment =
      sentimentFilter === "All" ||
      item.sentiment === sentimentFilter;

    const matchesCategory =
      categoryFilter === "All" ||
      item.category === categoryFilter;

    return (
      matchesSearch &&
      matchesSentiment &&
      matchesCategory
    );
  });

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="history-page">

        <h1>Prediction History</h1>

        <div className="history-toolbar">

          <div className="history-controls">

            <input
              type="text"
              placeholder="Search by text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={sentimentFilter}
              onChange={(e) =>
                setSentimentFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>Positive</option>
              <option>Negative</option>
              <option>Neutral</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>Education</option>
              <option>Healthcare</option>
              <option>Economy</option>
              <option>Election</option>
              <option>Agriculture</option>
              <option>Infrastructure</option>
              <option>Environment</option>
              <option>Technology</option>
              <option>General Politics</option>
            </select>

          </div>

          <button
            className="clear-btn"
            onClick={clearHistory}
          >
            🗑 Clear History
          </button>

        </div>

        <table className="history-table">

          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Sentiment</th>
              <th>Category</th>
              <th>Confidence</th>
              <th>Text</th>
            </tr>
          </thead>

          <tbody>

            {filteredHistory.length > 0 ? (

              filteredHistory.map((item, index) => (

                <tr key={index}>

                  <td>{item.timestamp}</td>

                  <td>

                    <span
                      className={
                        item.sentiment === "Positive"
                          ? "positive"
                          : item.sentiment === "Negative"
                          ? "negative"
                          : "neutral"
                      }
                    >
                      {item.sentiment}
                    </span>

                  </td>

                  <td>{item.category}</td>

                  <td>{item.confidence}%</td>

                  <td>{item.text}</td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="5">
                  No matching records found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default History;