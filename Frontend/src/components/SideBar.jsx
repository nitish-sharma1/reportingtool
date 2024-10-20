import React from 'react';
import { IoSettings } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoMdAnalytics } from "react-icons/io";


function SideBar() {
  return (
    <div className="w-64 bg-white text-btn-purple h-screen scroll-n flex flex-col">
      
      <nav className="flex-1 p-4 mt-10 items-start justify-start">
        <ul className="space-y-4">
          <li>
            <a href="#" className="hover:bg-gray-700 flex items-center justify-center p-2 bg-btn-purple text-white rounded-full ">
            <IoSettings  className='mr-1'/>Configurator
            </a>
          </li>
          <li>
            <a href="#" className="hover:bg-gray-700 flex items-center justify-center p-2 rounded ">
            <SiMicrosoftexcel className='mr-1' /> Your Reports
            </a>
          </li>
        
          <li>
            <a href="#" className="hover:bg-gray-700 flex items-center justify-center p-2 rounded ">
            <IoMdAnalytics className='mr-1' />  AI Analysis
            </a>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="w-full bg-red-600 hover:bg-red-500 text-white p-2 rounded">
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
