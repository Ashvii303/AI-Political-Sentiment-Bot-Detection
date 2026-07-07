def detect_category(text):
    text = text.lower()

    categories = {
        "Healthcare": [
            "hospital", "doctor", "medicine", "health",
            "covid", "vaccine", "medical", "clinic"
        ],

        "Education": [
            "school", "college", "student", "teacher",
            "education", "exam", "university"
        ],

        "Economy": [
            "economy", "gdp", "inflation", "tax",
            "budget", "finance", "market", "employment"
        ],

        "Election": [
            "election", "vote", "voting",
            "campaign", "candidate", "parliament"
        ],

        "Agriculture": [
            "farmer", "crop", "agriculture",
            "farming", "fertilizer", "harvest"
        ],

        "Infrastructure": [
            "road", "bridge", "railway",
            "airport", "metro", "construction"
        ],

        "Environment": [
            "climate", "pollution", "forest",
            "environment", "tree", "water"
        ],

        "Technology": [
            "digital", "internet", "ai",
            "technology", "software", "cyber"
        ]
    }

    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword in text:
                return category

    return "General Politics"