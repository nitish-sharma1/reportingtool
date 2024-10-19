import React from 'react'
import Logo from './Logo'
import { GiHamburgerMenu } from "react-icons/gi";
import SearchBar from './SearchBar';

function NavBar() {
  return (
    <div className='bg-white flex  items-center h-max p-2'>
        <div className='w-44 ml-16'> <Logo ></Logo></div>
        <span className='mx-4 '><GiHamburgerMenu size={20} /></span>
        <SearchBar></SearchBar>
        
        
        </div>
  )
}

export default NavBar