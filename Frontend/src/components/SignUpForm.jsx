import React, { useState } from 'react';
import axios from 'axios';
import femodel from '../assets/signup.jpg';
import CryptoJS from 'crypto-js';

function encryptPassword(password) {
  const secretKey = 'your-secret-key'; // Use a secure, pre-shared key
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}

function SignUpForm({ setSignUpStatus }) {
  // State to store form inputs and error message
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const encryptedPassword = encryptPassword(formData.password);
    const userData = {
      ...formData,
      password: encryptedPassword,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/signup',
        userData,
        {
          withCredentials: true, // Ensure cookies are sent/received
        }
      );
    
      if (response.status === 201) {
        alert('Sign up successful!');
        console.log(response.data); // Handle response data if needed
        setSignUpStatus(false); // Switch to login form after successful sign-up
      }
    } catch (err) {
      // Handle errors
      if (err.response) {
        // Server responded with a status other than 200
        setError(err.response.data.error || 'Failed to sign up. Please try again.');
      } else if (err.request) {
        // Request was made but no response received
        setError('No response from the server. Please try again later.');
      } else {
        // Something went wrong setting up the request
        setError('An error occurred. Please try again.');
      }
      console.error(err);
    }
    
  };

  return (
    <div className="flex w-full justify-between items-center">
      <div className="p-10 w-1/2">
        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-btn-purple text-white rounded hover:bg-grey-dark"
          >
            Sign up
          </button>
        </form>
        <p className="text-center m-2 text-btn-purple">
          Already have an account?{' '}
          <button
            onClick={() => setSignUpStatus(false)}
            className="text-btn-purple font-bold underline"
          >
            Login
          </button>
        </p>
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

export default SignUpForm;
