import { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import ConfigPage from "./components/ConfigPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

function App() {
  const [isLoggedIn, setLogin] = useState(false);

  // Helper function to check authentication via the backend
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_CHECK_AUTH_ENDPOINT, {
        withCredentials: true, // Include cookies
      });

      if (response.status === 200 && response.data.authenticated) {
        setLogin(true);
        localStorage.setItem("isLoggedIn", "true");
      } else {
        setLogin(false);
        localStorage.removeItem("isLoggedIn");
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setLogin(false);
      localStorage.removeItem("isLoggedIn");
    }
  };

  // Check authentication status on initial render
  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLoggedIn");
    if (storedLoginState === "true") {
      checkAuthStatus(); // Verify if the user is still authenticated
    }
  }, []);

  // Function to handle login/logout state changes and persist to localStorage
  const handleLogin = (status) => {
    setLogin(status);
    if (status) {
      localStorage.setItem("isLoggedIn", "true");
    } else {
      localStorage.removeItem("isLoggedIn");
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <>
        {isLoggedIn ? (
          <ConfigPage />
        ) : (
          <LoginPage setLogin={handleLogin} />
        )}
      </>
    </GoogleOAuthProvider>
  );
}

export default App;
