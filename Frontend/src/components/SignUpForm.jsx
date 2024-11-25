import React from 'react';
import femodel from '../assets/signup.jpg';

function SignUpForm({ setSignUpStatus }) {
  return (
    <div className='flex w-full justify-between items-center'>
        <div className="p-10 w-1/2">
      <input
        type="text"
        placeholder="Username"
        className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
      />
      <input
        type="email"
        placeholder="Email"
        className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
      />
      <input
        type="password"
        placeholder="Password"
        className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
      />
      <button className="w-full p-2 bg-btn-purple text-white rounded hover:bg-grey-dark">
        Sign up
      </button>
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
