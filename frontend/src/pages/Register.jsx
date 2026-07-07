import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {

    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {

      const response = await api.post("/register", {
          name,
          email,
          password,
        }
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed."
      );

    }

  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Create Account</h1>

        <p>Join PolitiSense AI</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={registerUser}>
          Register
        </button>

        <p className="bottom-text">
          Already have an account?

          <span
            onClick={() => navigate("/login")}
            style={{
              color:"#2563eb",
              cursor:"pointer",
              fontWeight:"600"
            }}
          >
            {" "}Login
          </span>

        </p>

      </div>

    </div>
  );
}

export default Register;