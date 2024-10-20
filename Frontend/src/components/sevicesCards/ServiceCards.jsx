import React from 'react'


function ServiceCards(props) {
  return (
    <div className='m-16 bg-white shadow-md flex  flex-col items-center justify-center p-6  w-64 h-64 '>
        <img src={props.imgsrc} className='w-70 h-auto  object-cover mix-blend-multiply p-4' />
        <p className='text-btn-green text-center'>{props.msg}</p>
    </div>
  )
}

export default ServiceCards