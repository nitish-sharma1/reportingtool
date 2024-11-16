import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";

function BackButton({ onSelectService }) {
  return (
    <div className='ml-72 m-4  fixed cursor-pointer' onClick={() => onSelectService(null)}><div className='flex items-center text-btn-purple'><IoMdArrowRoundBack /> Back to configurator</div></div>
  )
}

export default BackButton