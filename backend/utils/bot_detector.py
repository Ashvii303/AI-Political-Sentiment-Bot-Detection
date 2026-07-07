import re

def detect_bot_probability(text):

    score = 0

    text_lower = text.lower()

    # -----------------------------
    # URLs
    # -----------------------------
    if re.search(r"http|www\.", text_lower):
        score += 25

    # -----------------------------
    # ALL CAPS Words
    # -----------------------------
    caps_words = [
        word for word in text.split()
        if word.isupper() and len(word) > 2
    ]

    if len(caps_words) >= 2:
        score += 20

    # -----------------------------
    # Too many ! or ?
    # -----------------------------
    if text.count("!") >= 3:
        score += 15

    if text.count("?") >= 3:
        score += 10

    # -----------------------------
    # Spam Keywords
    # -----------------------------
    spam_keywords = [

        "click",

        "winner",

        "win",

        "free",

        "urgent",

        "offer",

        "buy now",

        "subscribe",

        "limited",

        "money"

    ]

    for word in spam_keywords:

        if word in text_lower:

            score += 25

            break

    # -----------------------------
    # Repeated Words
    # -----------------------------
    words = text_lower.split()

    repeated = len(words) - len(set(words))

    if repeated >= 3:

        score += 15

    # -----------------------------
    # Limit Score
    # -----------------------------
    score = min(score,100)

    return score