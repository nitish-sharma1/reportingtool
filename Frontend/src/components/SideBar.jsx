import React from 'react';
import { IoSettings } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoMdAnalytics } from "react-icons/io";
import sidebarBottom from "../assets/sidebarbottom.gif"


function SideBar() {
  return (
    <div className="w-64 bg-white text-btn-purple h-full flex flex-col">
      
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
    <div className='m-4'>
        <img src={sidebarBottom}/>
    </div>
    </div>
  );
}

export default SideBar;
