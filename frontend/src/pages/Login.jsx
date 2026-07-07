import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {

      const response = await axios.post(
        "http://127.0.0.1:5001/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed!"
      );

    }

  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p>Login to continue to PolitiSense AI</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={loginUser}>
          Login
        </button>

        <p className="bottom-text">
          Don't have an account?

          <span
            onClick={()=>navigate("/register")}
            style={{
              color:"#2563eb",
              cursor:"pointer",
              fontWeight:"600"
            }}
          >
            {" "}Register
          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;