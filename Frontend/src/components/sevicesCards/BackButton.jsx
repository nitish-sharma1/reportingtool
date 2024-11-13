import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";

function BackButton({ onSelectService }) {
  return (
    <div className='m-4 cursor-pointer' onClick={() => onSelectService(null)}><div className='flex items-center text-btn-purple'><IoMdArrowRoundBack /> Back to configurator</div></div>
  )
}

export default BackButton