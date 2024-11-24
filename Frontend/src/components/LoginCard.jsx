import React, { useState } from 'react';
import Logo from './Logo';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm'; // Assume you have or will create this component

function LoginCard() {
  const [signUpStatus, setSignUpStatus] = useState(false);

  return (
    <div className="bg-off-white w-2/5 p-4 rounded-lg flex flex-col items-center justify-center">
      <div className="w-80">
        <Logo />
      </div>
      {signUpStatus ? (
        <SignUpForm setSignUpStatus={setSignUpStatus} />
      ) : (
        <LoginForm setSignUpStatus={setSignUpStatus} />
      )}
    </div>
  );
}

export default LoginCard;
