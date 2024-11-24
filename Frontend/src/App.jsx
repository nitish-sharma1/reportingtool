import { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import ConfigPage from './components/ConfigPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [isLoggedIn, setLogin] = useState(false);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <>
        {isLoggedIn ? (
          <ConfigPage />
        ) : (
          <LoginPage setLogin={setLogin} />
        )}
      </>
    </GoogleOAuthProvider>
  );
}

export default App;
