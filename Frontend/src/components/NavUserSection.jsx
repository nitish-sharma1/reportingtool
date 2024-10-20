import React from 'react'
import avatar from '../assets/avatar.png'
import { MdNotificationsActive } from "react-icons/md";

function NavUserSection() {
  return (
    <div className='flex items-center'><MdNotificationsActive size={20} />
    <img src={avatar}  className='mx-10'/>
    </div>
  )
}

export default NavUserSection