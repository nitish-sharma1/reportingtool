import React from 'react';
import femodel from '../assets/FEmodel.jpg';
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from '@react-oauth/google';

function LoginForm({ setSignUpStatus, setLogin }) {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Google Login Success:', tokenResponse);
      // You can send tokenResponse.access_token to your backend for verification
      setLogin(true); // Log the user in after successful Google sign-in
    },
    onError: () => {
      console.error('Google Login Failed');
    },
  });

  return (
    <div className="flex w-full justify-between items-center">
      <div className="p-10 w-1/2">
        <input
          type="text"
          placeholder="Username"
          className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
        />
        <button className="w-full p-2 bg-btn-purple text-white rounded hover:bg-grey-dark">
          Login
        </button>
        <p className="text-center m-2 text-btn-purple">
          Do not have the account?{' '}
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
