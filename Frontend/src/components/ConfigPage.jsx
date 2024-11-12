// ConfigPage.js
import React, { useState } from 'react';
import NavBar from './NavBar';
import ConfigPageBody from './ConfigPageBody';
import SideBar from './SideBar';
import AddDataSourceService from './sevicesCards/AddDataSourceService';
import AddNewOutboundService from './sevicesCards/AddNewOutboundService';
import AddReportService from './sevicesCards/AddReportService';

function ConfigPage() {
  const [selectedService, setSelectedService] = useState(null);

  const renderServiceComponent = () => {
    switch (selectedService) {
      case 'dataSource':
        return <AddDataSourceService />;
      case 'report':
        return <AddReportService />;
      case 'cloudStorage':
        return <AddNewOutboundService />;
      default:
        return <ConfigPageBody onSelectService={setSelectedService} />;
    }
  };

  return (
    <div className='bg-off-white flex flex-col h-screen overflow-hidden'>
      <NavBar />
      <div className='flex flex-grow'> 
        <SideBar />
        {renderServiceComponent()}
      </div>
    </div>
  );
}

export default ConfigPage;
