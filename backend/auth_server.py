from flask import Flask, request, jsonify
from flask_cors import CORS
from database.auth import register_user, login_user

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "Authentication Server Running"
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
            "message": "Registration Successful!"
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


if __name__ == "__main__":
    app.run(port=5001, debug=True)