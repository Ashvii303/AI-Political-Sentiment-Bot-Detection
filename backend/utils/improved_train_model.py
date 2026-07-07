import pandas as pd
import re
import string
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report

# ----------------------------
# Load Dataset
# ----------------------------

df = pd.read_csv(
    "../dataset/training.1600000.processed.noemoticon.csv",
    encoding="latin-1",
    header=None
)

# Keep only sentiment and tweet
df = df[[0, 5]]
df.columns = ["sentiment", "text"]

# Convert labels
# 0 -> Negative
# 2 -> Neutral
# 4 -> Positive

mapping = {
    0: "Negative",
    2: "Neutral",
    4: "Positive"
}

df["sentiment"] = df["sentiment"].map(mapping)

# Remove rows that become NaN (if no neutral exists)
df = df.dropna()

# ----------------------------
# Text Cleaning
# ----------------------------

def clean_text(text):

    text = text.lower()

    text = re.sub(r"http\S+", "", text)

    text = re.sub(r"@\w+", "", text)

    text = re.sub(r"#", "", text)

    text = text.translate(
        str.maketrans("", "", string.punctuation)
    )

    text = re.sub(r"\d+", "", text)

    text = re.sub(r"\s+", " ", text)

    return text.strip()

df["text"] = df["text"].apply(clean_text)

# ----------------------------
# Split
# ----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    df["text"],
    df["sentiment"],
    test_size=0.2,
    random_state=42,
    stratify=df["sentiment"]
)

# ----------------------------
# TF-IDF
# ----------------------------

vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=6000,
    ngram_range=(1,2)
)

X_train = vectorizer.fit_transform(X_train)
X_test = vectorizer.transform(X_test)

# ----------------------------
# Train
# ----------------------------

model = LogisticRegression(
    max_iter=1000,
    random_state=42
)

model.fit(X_train, y_train)

# ----------------------------
# Evaluate
# ----------------------------

pred = model.predict(X_test)

print("\nAccuracy:", accuracy_score(y_test, pred))

print("\nClassification Report\n")

print(classification_report(y_test, pred))

# ----------------------------
# Save
# ----------------------------

joblib.dump(model, "../models/sentiment_model.pkl")

joblib.dump(vectorizer, "../models/vectorizer.pkl")

print("\nModel Saved Successfully!")