import React, { useState } from "react";
import femodel from "../assets/FEmodel.jpg";
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import CryptoJS from "crypto-js";

function LoginForm({ setSignUpStatus, setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      setLogin(true); // Log the user in after successful Google sign-in
    },
    onError: () => {
      console.error("Google Login Failed");
    },
  });

  const handleLogin = async () => {
    try {
      const hashedPassword = CryptoJS.SHA256(password).toString(); // Example hashing algorithm

      const response = await axios.post(
        import.meta.env.VITE_LOGIN_ENDPOINT,
        {
          username,
          password: hashedPassword, // Send the hashed password
        },
        { withCredentials: true } // Enable sending cookies
      );
      if (response.status === 200) {
        console.log(response.data.msg); // Login successful
        setLogin(true); // Log the user in
        window.location.href = "/reports"; // Redirect to login page
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg || "Invalid credentials");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin(); // Trigger login on Enter key press
    }
  };

  return (
    <div className="flex w-full justify-between items-center">
      <div className="p-10 w-1/2">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key press
          className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key press
          className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-btn-purple text-white rounded hover:bg-grey-dark"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <p className="text-center m-2 text-btn-purple">
          Do not have the account?{" "}
          <button
            onClick={() => setSignUpStatus(true)}
            className="text-btn-purple font-bold underline"
          >
            Sign up
          </button>
        </p>
        <button
          onClick={handleGoogleLogin}
          className="w-full rounded-full border border-grey-300 p-2 my-2 flex items-center justify-center bg-white text-grey-dark"
        >
          <span className="mx-2">
            <FaGoogle />
          </span>
          Sign-in with Google
        </button>
      </div>

      <div className="p-10">
        <img
          src={femodel}
          alt="Female Model"
          className="w-80 h-auto object-cover mix-blend-multiply"
        />
      </div>
    </div>
  );
}

export default LoginForm;
