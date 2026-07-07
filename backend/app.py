from flask import Flask, request, jsonify
from database.auth import register_user, login_user
from flask_cors import CORS
import joblib
import json
from datetime import datetime
import os
from utils.bot_detector import detect_bot_probability
import random
from utils.category_detector import detect_category

app = Flask(__name__)
CORS(app)

# -----------------------------
# Load Trained Model
# -----------------------------
model = joblib.load("models/sentiment_model.pkl")
vectorizer = joblib.load("models/vectorizer.pkl")

# -----------------------------
# History File
# -----------------------------
HISTORY_FILE = "history/prediction_history.json"

# Create history folder/file if not exists
os.makedirs("history", exist_ok=True)

if not os.path.exists(HISTORY_FILE):
    with open(HISTORY_FILE, "w") as file:
        json.dump([], file)

# -----------------------------
# Home Route
# -----------------------------
@app.route("/")
def home():
    return jsonify({
        "message": "PolitiSense AI Backend Running 🚀"
    })

# -----------------------------
# Prediction Route
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    text = data.get("text", "")

    if text.strip() == "":
        return jsonify({
            "error": "Text cannot be empty."
        }), 400

    # Transform text
    text_vector = vectorizer.transform([text])

    # Predict
    prediction = model.predict(text_vector)[0]
    category = detect_category(text)
    bot_probability = detect_bot_probability(text)

    # Confidence
    probabilities = model.predict_proba(text_vector)
    confidence = round(max(probabilities[0]) * 100, 2)

    # -----------------------------
    # Load Existing History
    # -----------------------------
    try:
        with open(HISTORY_FILE, "r") as file:
            history = json.load(file)
    except:
        history = []

    # -----------------------------
    # Add New Record
    # -----------------------------
    history.append({
    "text": text,
    "sentiment": prediction,
    "category": category,
    "confidence": confidence,
    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
})

    # -----------------------------
    # Save History
    # -----------------------------
    with open(HISTORY_FILE, "w") as file:
        json.dump(history, file, indent=4)

    # -----------------------------
    # Return Response
    # -----------------------------
    

    return jsonify({
    "sentiment": prediction,
    "confidence": confidence,
    "category": category,
    "bot_probability": f"{bot_probability}%"
})

# -----------------------------
# Get History
# -----------------------------
@app.route("/history", methods=["GET"])
def get_history():

    try:
        with open(HISTORY_FILE, "r") as file:
            history = json.load(file)
    except:
        history = []

    return jsonify(history)
@app.route("/dashboard", methods=["GET"])
def dashboard():

    try:
        with open(HISTORY_FILE, "r") as file:
            history = json.load(file)
    except:
        history = []

    total = len(history)

    positive = sum(1 for item in history if item["sentiment"] == "Positive")
    negative = sum(1 for item in history if item["sentiment"] == "Negative")
    neutral = sum(1 for item in history if item["sentiment"] == "Neutral")

    return jsonify({
        "total": total,
        "positive": positive,
        "negative": negative,
        "neutral": neutral,
        "history": history[-5:]
    })
    @app.route("/clear_history", methods=["DELETE"])
    def clear_history():
        with open(HISTORY_FILE, "w") as file:
            json.dump([], file)
            return jsonify({
        "message": "History Cleared Successfully"
    })
            
    @app.route("/insights")
    def insights():
        try:
            with open(HISTORY_FILE, "r") as file:
                history = json.load(file)
        except:
            history = []

    if len(history) == 0:
        return jsonify({
            "top_category": "-",
            "top_sentiment": "-",
            "bot_alerts": 0,
            "last_analysis": "-"
        })

    from collections import Counter

    category_counter = Counter(
        item.get("category", "Unknown")
        for item in history
    )

    sentiment_counter = Counter(
        item.get("sentiment", "Unknown")
        for item in history
    )

    bot_alerts = sum(
        1
        for item in history
        if int(str(item.get("bot_probability", "0")).replace("%", "")) > 50
    )

    return jsonify({
        "top_category": category_counter.most_common(1)[0][0],
        "top_sentiment": sentiment_counter.most_common(1)[0][0],
        "bot_alerts": bot_alerts,
        "last_analysis": history[-1]["timestamp"]
    })
    
    @app.route("/register", methods=["POST"])
    def register():
        data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({
            "success": False,
            "message": "All fields are required."
        }), 400

    success = register_user(name, email, password)

    if success:
        return jsonify({
            "success": True,
            "message": "Registration successful."
        })

    return jsonify({
        "success": False,
        "message": "Email already exists."
    }), 400


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = login_user(email, password)

    if user:
        return jsonify({
            "success": True,
            "name": user[1],
            "email": user[2]
        })

    return jsonify({
        "success": False,
        "message": "Invalid email or password."
    }), 401


    
@app.route("/dashboard", methods=["GET"])
def dashboard():

    try:
        with open(HISTORY_FILE, "r") as file:
            history = json.load(file)
    except:
        history = []

    total = len(history)

    positive = sum(
        1 for item in history
        if item["sentiment"] == "Positive"
    )

    negative = sum(
        1 for item in history
        if item["sentiment"] == "Negative"
    )

    neutral = sum(
        1 for item in history
        if item["sentiment"] == "Neutral"
    )

    return jsonify({
        "total": total,
        "positive": positive,
        "negative": negative,
        "neutral": neutral,
        "history": history[-5:]
    })
    
    import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )
    
    