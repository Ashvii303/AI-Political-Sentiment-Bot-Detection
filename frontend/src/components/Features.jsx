import "../styles/Features.css";
import { FaBrain, FaRobot, FaChartLine } from "react-icons/fa";

function Features() {
  return (
    <section className="features">

      <h2>Why Choose PolitiSense AI?</h2>

      <p className="feature-subtitle">
        Powerful AI tools to analyze political discussions with confidence.
      </p>

      <div className="feature-grid">

        <div className="feature-card">
          <FaBrain className="feature-icon" />
          <h3>AI Sentiment Analysis</h3>
          <p>
            Analyze political opinions and classify sentiments using AI.
          </p>
        </div>

        <div className="feature-card">
          <FaRobot className="feature-icon" />
          <h3>Bot Detection</h3>
          <p>
            Detect suspicious automated accounts and fake engagement.
          </p>
        </div>

        <div className="feature-card">
          <FaChartLine className="feature-icon" />
          <h3>Interactive Dashboard</h3>
          <p>
            Visualize insights through charts, trends, and analytics.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Features;