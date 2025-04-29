import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Import the CSS file for styles

interface Props {
  onLoginSuccess: (rollNumber: string) => void;
}

const Login: React.FC<Props> = ({ onLoginSuccess }) => {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    try {
      await axios.post(
        "https://dynamic-form-generator-9rl7.onrender.com/create-user",
        {
          rollNumber,
          name,
        }
      );
      onLoginSuccess(rollNumber);
    } catch (error) {
      alert(error);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <input
          className="login-input"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <input
          className="login-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
