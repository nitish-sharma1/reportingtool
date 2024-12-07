import React, { useState } from 'react';
import Logo from './Logo';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm'; // Assume you have or will create this component

function LoginCard({ setLogin }) {
  const [signUpStatus, setSignUpStatus] = useState(false);


  return (
    <div className="bg-off-white w-2/5 p-4 rounded-lg flex flex-col items-center justify-center">
      <div className="w-80">
        <Logo />
      </div>
      {signUpStatus ? (
        <SignUpForm setSignUpStatus={setSignUpStatus} setLogin={setLogin} />
      ) : (
        <LoginForm setSignUpStatus={setSignUpStatus} setLogin={setLogin} />
      )}
    </div>
  );
}

export default LoginCard;
