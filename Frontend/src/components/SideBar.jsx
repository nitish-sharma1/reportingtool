import React from 'react';
import { IoSettings } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoMdAnalytics } from "react-icons/io";
import sidebarBottom from "../assets/sidebarbottom.gif";
import { BrowserRouter as Router, NavLink, Route, Routes } from "react-router-dom";

function Configurator() {
  return <div>Configurator Page</div>;
}

function Reports() {
  return <div>Your Reports Page</div>;
}

function AIAnalysis() {
  return <div>AI Analysis Page</div>;
}

function SideBar() {
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
          <Route path="/configurator" element={<Configurator />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analysis" element={<AIAnalysis />} />
        </Routes>
      </div>
    </Router>
  );
}

export default SideBar;
