import React,{useState} from 'react'
import Logo from './Logo'
import LoginForm from './LoginForm'

function LoginCard() {
  const [signUpStatus , setSignUpStatus] = useState(false)
  return (
    
    <div className='bg-off-white w-2/5 p-4 rounded-lg flex flex-col items-center justify-center'>
        <div className='w-80'><Logo></Logo></div>
        {signUpStatus ? <LoginForm></LoginForm> : <LoginForm></LoginForm>  } 
        
        
    </div>
  )
}

export default LoginCard