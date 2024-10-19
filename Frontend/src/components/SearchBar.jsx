import React from 'react';
import { FiSearch } from "react-icons/fi";

function SearchBar() {
  return (
    <div className='border border-bg-grey flex items-center ml-16 w-1/2 rounded-full p-2'>  
        <div className='w-full'>
            <input 
                type='text' 
                placeholder='Search Reports' 
                className='w-full block ps-10 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
            />
        </div>
        <div className='mr-6'>
            <FiSearch size={20} />
        </div>
    </div>
  );
}

export default SearchBar;
