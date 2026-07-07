import "../styles/HowItWorks.css";
import { FaUser, FaSearch, FaBrain, FaChartBar } from "react-icons/fa";

function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <p>Analyze political data in four simple steps.</p>

      <div className="steps">

        <div className="step-card">
          <div className="step-icon"><FaUser /></div>
          <h3>Login</h3>
          <p>Create an account and sign in.</p>
        </div>

        <div className="step-card">
          <div className="step-icon"><FaSearch /></div>
          <h3>Analyze</h3>
          <p>Enter a political topic or text.</p>
        </div>

        <div className="step-card">
          <div className="step-icon"><FaBrain /></div>
          <h3>AI Processing</h3>
          <p>AI predicts sentiment and detects bots.</p>
        </div>

        <div className="step-card">
          <div className="step-icon"><FaChartBar /></div>
          <h3>Insights</h3>
          <p>View charts and detailed analytics.</p>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;