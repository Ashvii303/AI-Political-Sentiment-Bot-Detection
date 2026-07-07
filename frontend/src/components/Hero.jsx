import "../styles/Hero.css";
import DashboardPreview from "./DashboardPreview";
import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="hero-tag">
          🚀 AI Powered Platform
        </span>

        <h1>
          AI-Powered Political
          <br />
          Sentiment & Bot Detection
        </h1>

        <p>
          Analyze political discussions in real time using Machine
          Learning. Detect sentiment, identify bot-like behaviour,
          classify political topics, and visualize insights through
          an interactive analytics dashboard.
        </p>

        <div className="hero-buttons">
          <button
    className="primary-btn"
    onClick={() => navigate("/login")}
>
    🚀 Get Started
</button>

          <button
    className="secondary-btn"
    onClick={() => navigate("/dashboard")}
>
    ▶ Live Demo
</button>
        </div>

        <div className="hero-features">

          <div className="feature-badge">
            ⚡ Real-time Analysis
          </div>

          <div className="feature-badge">
            🤖 AI Bot Detection
          </div>

          <div className="feature-badge">
            📊 Smart Dashboard
          </div>

          <div className="feature-badge">
            🧠 ML Prediction
          </div>

        </div>

      </div>

      <div className="hero-right">
        <DashboardPreview />
      </div>

    </section>
  );
}

export default Hero;