from pymongo import MongoClient

MONGO_URI = "mongodb+srv://politisense:PolitiSense2026@cluster0.kptambp.mongodb.net/?appName=Cluster0&compressors=zlib"

try:
    client = MongoClient(
        MONGO_URI,
        tls=True,
        serverSelectionTimeoutMS=5000
    )

    client.admin.command("ping")

    print("✅ Connected Successfully!")

except Exception as e:
    print(type(e).__name__)
    print(e)
