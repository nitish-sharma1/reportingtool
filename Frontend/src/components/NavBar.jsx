import React from 'react'
import Logo from './Logo'
import { GiHamburgerMenu } from "react-icons/gi";
import SearchBar from './SearchBar';
import NavUserSection from './NavUserSection';

function NavBar() {
  return (
    <div className='bg-white flex w-full justify-between items-center h-max p-2'>
        <div className='w-52 ml-8 flex items-center'> <Logo ></Logo> <span className='mx-4 '><GiHamburgerMenu size={20} /></span></div>
        
        <SearchBar></SearchBar>
        <div className=' flex justify-end '><NavUserSection></NavUserSection></div>
        
        
        </div>
  )
}

export default NavBar