import React from 'react'


function ServiceCards(props) {
  return (
    <div className='m-16 bg-white shadow-md flex  flex-col items-center text-btn-purple justify-center p-6  w-68 h-68 hover:bg-btn-purple hover:text-white ' onClick={props.onClick}>
        <div className=' w-56 h-56'><img src={props.imgsrc} className=' w-56 h-56  mix-blend-multiply' /></div>
        <p className=' text-center '>{props.msg}</p>
    </div>
  )
}

export default ServiceCards 