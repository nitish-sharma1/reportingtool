import React from 'react';
import femodel from '../assets/FEmodel.jpg';
import { FaGoogle } from "react-icons/fa";


function LoginForm() {
  return (
    <div className='flex w-full justify-between items-center'>
      <div className='p-10 w-1/2 '>
        
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
        <button className="w-full p-2 bg-btn-purple text-white rounded hover:bg-blue-600">
          Login
        </button>
        <p className='text-center m-2 text-btn-purple'>Do not have the account ?</p>
        <button className="w-full p-2 bg-grey-dark text-white rounded hover:bg-blue-600">
          Sign-up
        </button>
        <button className="w-full rounded-full border border-s-blue-500 p-2 my-2 flex items-center justify-center bg-white text-grey-dark ">
        <span className='mx-2'><FaGoogle /> </span>
          Sign-in with google
        </button>
        


      </div>

      <div className='p-10'>
        <img src={femodel} alt="Female Model" className='w-80 h-auto  object-cover mix-blend-multiply' />
      </div>
    </div>
  );
}

export default LoginForm;
