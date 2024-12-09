import React from "react";
import { auth, provider, signInWithPopup, signOut } from "../Auth/firebaseconfig";
import { useNavigate } from "react-router-dom";
import { GithubAuthProvider } from "firebase/auth";
import { useUser } from "../UserContext";

function Login() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const loginWithGitHub = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken; // Optional GitHub access token
      const user = result.user;

      console.log("User Info:", user);
      console.log("Access Token:", token);

      setUser(user); // Update the user state using context
      navigate("/welcome"); // Navigate to the welcome page
    } catch (error) {
      console.error("Error during GitHub authentication:", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User logged out");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName || "User"}!</h1>
          <p>Email: {user.email}</p>
          <img
            src={user.photoURL}
            alt="User Avatar"
            style={{ borderRadius: "50%" }}
          />
          <br />
          <button onClick={logout} style={{ marginTop: "20px" }}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h1>GitHub Authentication</h1>
          <button onClick={loginWithGitHub} style={{ marginTop: "20px" }}>
            Login with GitHub
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
