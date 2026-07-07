import { useState } from "react";
import api from "../services/api";
import "../styles/Analyze.css";

function Analyze() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const [result, setResult] = useState(null);

  const analyzeText = async () => {
    try {
      const response = await api.post(
        "/predict",
        {
          text: text,
        }
      );

      setResult(response.data);

    } catch (error) {
      alert("Unable to connect to the server. Please ensure the backend is running.");
  return;
    }
  };

  return (
    <div className="analyze-page">

      <h1>Political Sentiment Analysis</h1>

      <p>Paste any political text below.</p>

      <textarea
        placeholder="Paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
  onClick={analyzeText}
  disabled={loading}
>
  {loading ? "Analyzing..." : "Analyze"}
</button>

      {result && (

        <div className="result-card">

          <h2>🧠 AI Prediction</h2>

          <div className="result-row">
            <span>Sentiment</span>
            <strong
  className={
    result.sentiment === "Positive"
      ? "positive"
      : result.sentiment === "Negative"
      ? "negative"
      : "neutral"
  }
>
  {result.sentiment}
</strong>
          </div>

          <div className="result-row">
  <span>Confidence</span>
  <strong>{result.confidence}%</strong>
</div>

          <div className="result-row">
            <span>Bot Probability</span>
            <strong>{result.bot_probability}</strong>
          </div>
          <div className="result-row">
  <span>Category</span>
  <strong>{result.category}</strong>
</div>

        </div>

      )}
     

    </div>
  );
}

export default Analyze;