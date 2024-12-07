import React from 'react'

import LoginCard from './LoginCard'

function LoginPage({ setLogin }) {
  return (
    <div className='login w-full h-screen bg-gray-900 flex items-center justify-center'>
    <LoginCard setLogin={setLogin}></LoginCard>
    </div>
  )
}

export default LoginPage