import pandas as pd
import joblib

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# -----------------------------
# Load Sentiment140 Dataset
# -----------------------------
twitter = pd.read_csv(
    "../dataset/training.1600000.processed.noemoticon.csv",
    encoding="latin-1",
    header=None
)

twitter = twitter[[0, 5]]
twitter.columns = ["sentiment", "text"]

twitter["sentiment"] = twitter["sentiment"].map({
    0: "Negative",
    4: "Positive"
})

# -----------------------------
# Load Neutral Dataset
# -----------------------------
neutral = pd.read_csv("../dataset/neutral_sentences.csv")

# -----------------------------
# Combine Both
# -----------------------------
data = pd.concat([twitter, neutral], ignore_index=True)

data.dropna(inplace=True)

print("Dataset Size:", len(data))

X = data["text"]
y = data["sentiment"]

# -----------------------------
# Split Data
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# -----------------------------
# TF-IDF
# -----------------------------
vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=10000
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# -----------------------------
# Train
# -----------------------------
model = LogisticRegression(max_iter=1000)

model.fit(X_train_vec, y_train)

# -----------------------------
# Evaluate
# -----------------------------
predictions = model.predict(X_test_vec)

accuracy = accuracy_score(y_test, predictions)

print(f"\nAccuracy : {accuracy*100:.2f}%\n")

print(classification_report(y_test, predictions))

# -----------------------------
# Save
# -----------------------------
joblib.dump(model, "../models/sentiment_model.pkl")
joblib.dump(vectorizer, "../models/vectorizer.pkl")

print("\n✅ Three-Class Model Saved Successfully")