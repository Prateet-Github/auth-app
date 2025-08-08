import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthPage = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up") {
        // Only pass email and password to signUp
        await signUp(email, password, username);
      } else {
        await signIn(email, password);
      }
      navigate("/chat");
    } catch (error) {
      console.error("Auth error:", error.message);
      // You might want to show this error to the user
      alert(`Authentication failed: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>User Authentication</h1>

        {/* Only show username field for Sign Up */}
        {currentState === "Sign Up" && (
          <input
            type="text"
            placeholder="enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        )}

        <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete={
            currentState === "Sign Up" ? "new-password" : "current-password"
          }
        />

        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Log In"}
        </button>

        <br />

        <button
          type="button"
          onClick={() => {
            setCurrentState(currentState === "Sign Up" ? "Sign In" : "Sign Up");
            // Clear form when switching
            setUsername("");
            setEmail("");
            setPassword("");
          }}
        >
          Switch to {currentState === "Sign Up" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
