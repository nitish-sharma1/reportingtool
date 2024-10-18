import React from 'react'
import Logo from './Logo'
import LoginForm from './LoginForm'

function LoginCard() {
  return (
    
    <div className='bg-off-white w-2/5 p-4 rounded-lg flex flex-col items-center justify-center'>
        <Logo></Logo>
        <LoginForm></LoginForm>
        
        
    </div>
  )
}

export default LoginCard