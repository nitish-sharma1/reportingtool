import React from 'react';

function SignUpForm({ setSignUpStatus }) {
  return (
    <div>
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
  );
}

export default SignUpForm;
