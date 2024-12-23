import { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import ConfigPage from './components/ConfigPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [isLoggedIn, setLogin] = useState(false);

  // Load login state from localStorage on initial render
  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLoggedIn");
    if (storedLoginState === "true") {
      setLogin(true);
    }
  }, []);

  // Function to handle login state changes and persist to localStorage
  const handleLogin = (status) => {
    setLogin(status);
    localStorage.setItem("isLoggedIn", status);
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
