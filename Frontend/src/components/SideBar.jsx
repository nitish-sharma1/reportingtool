import React from 'react';
import { IoSettings } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoMdAnalytics } from "react-icons/io";
import sidebarBottom from "../assets/sidebarbottom.gif";
import YourReportsBody from './YourReportsBody';
import { BrowserRouter as Router, NavLink, Route, Routes } from "react-router-dom";


function SideBar({ onSelectService }) {
  return (
    <Router>
      <div className="w-64 bg-white text-btn-purple h-full flex flex-col">
        <nav className="flex-1 p-4 mt-10 items-start justify-start">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/configurator"
                className={({ isActive }) =>
                  `flex items-center justify-center p-2 rounded-full ${
                    isActive ? "bg-btn-purple text-white" : "hover:bg-gray-700"
                  }`
                }
                onClick={() => onSelectService(null)}
              >
                <IoSettings className="mr-1" /> Configurator
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  `flex items-center justify-center p-2 rounded-full ${
                    isActive ? "bg-btn-purple text-white" : "hover:bg-gray-700"
                  }`
                }
                onClick={() => onSelectService('reportspage')}
              >
                <SiMicrosoftexcel className="mr-1" /> Your Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analysis"
                className={({ isActive }) =>
                  `flex items-center justify-center p-2 rounded-full ${
                    isActive ? "bg-btn-purple text-white" : "hover:bg-gray-700"
                  }`
                }
                onClick={() => onSelectService('aianalysispage')}
              >
                <IoMdAnalytics className="mr-1" /> AI Analysis
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="m-4">
          <img src={sidebarBottom} alt="Sidebar Bottom" />
        </div>

        {/* Define Routes */}
        <Routes>
          <Route path="/configurator" />
          <Route path="/reports"/>
          <Route path="/analysis"  />
        </Routes>
      </div>
    </Router>
  );
}

export default SideBar;
