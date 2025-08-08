import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  const { user, signOut, getDisplayName } = useAuth(); // Add getDisplayName here
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const displayName = getDisplayName(); // Define displayName here

  return (
    <div>
      <h1>Welcome to the Chat App!</h1>
      <p>Hello, {displayName}! 👋</p>
      <p>Email: {user?.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default HomePage;
