// ConfigPage.js
import React, { useState,useEffect } from 'react';
import NavBar from './NavBar';
import ConfigPageBody from './ConfigPageBody';
import SideBar from './SideBar';
import AddDataSourceService from './sevicesCards/AddDataSourceService';
import AddNewOutboundService from './sevicesCards/AddNewOutboundService';
import AddReportService from './sevicesCards/AddReportService';
import BackButton from './sevicesCards/BackButton';
import YourReportsBody from './YourReportsBody';
import AiAnalysis from './sevicesCards/AiAnalysis';

function ConfigPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [returnBtn, setReturnBtn] = useState(false);

  const renderServiceComponent = () => {
    switch (selectedService) {
      case 'dataSource':
        return <AddDataSourceService />;
      case 'report':
        return <AddReportService />;
      case 'cloudStorage':
        return <AddNewOutboundService />;
      case 'reportspage':
        return <YourReportsBody />;
      case 'aianalysispage':
        return <AiAnalysis />;
      default:
        return <ConfigPageBody onSelectService={setSelectedService} />;
    }
  };

  useEffect(() => {
    if (selectedService === 'dataSource' || selectedService === 'report' || selectedService === 'cloudStorage') {
      setReturnBtn(true);
    } else {
      setReturnBtn(false);
    }
  }, [selectedService]);

  return (
    <div className='bg-off-white flex flex-col h-screen overflow-hidden'>
      <NavBar />
      <div className='flex flex-grow'> 
        <SideBar onSelectService={setSelectedService}  />
        {returnBtn && <BackButton onSelectService={setSelectedService} />}
        {renderServiceComponent()}
      </div>
      
      
    </div>
  );
}

export default ConfigPage;
