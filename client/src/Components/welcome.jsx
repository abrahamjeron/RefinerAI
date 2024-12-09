import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../Auth/firebaseconfig";
import { useUser } from "../UserContext";

function Welcome() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User logged out");
      navigate("/"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  if (!user) {
    return <div>No user data available. Please log in again.</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {user.displayName || "User"}!</h1>
      <p>Email: {user.email}</p>
      <img
        src={user.photoURL}
        alt="User Avatar"
        style={{ borderRadius: "50%", width: "100px", height: "100px" }}
      />
      <br />
      <button onClick={logout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
}

export default Welcome;
