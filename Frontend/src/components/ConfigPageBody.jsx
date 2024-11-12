// ConfigPageBody.js
import React from 'react';
import ServiceCards from './sevicesCards/ServiceCards';
import datasource from '../assets/datasource.jpg';
import report from '../assets/report.svg';
import cloudStorage from '../assets/cloudstorage.png';

function ConfigPageBody({ onSelectService }) {
  return (
    <div className='flex-grow bg-gray-200 flex justify-center items-center p-4 cursor-pointer'>
        <ServiceCards imgsrc={datasource} msg="Add New Data Source" onClick={() => onSelectService('dataSource')} />
        <ServiceCards imgsrc={report} msg="Schedule new report" onClick={() => onSelectService('report')} />
        <ServiceCards imgsrc={cloudStorage} msg="Configure new SFTP / MFT / Mail-server" onClick={() => onSelectService('cloudStorage')} />
    </div>
  );
}

export default ConfigPageBody;
