import React from 'react'
import ServiceCards from './sevicesCards/ServiceCards'
import datasource from '../assets/datasource.jpg'
import report from '../assets/report.svg'
import cloudStorage from '../assets/cloudstorage.png'

function ConfigPageBody() {
  return (
    <div className='flex-grow bg-gray-200 flex justify-center  items-center p-4 '>
        <ServiceCards imgsrc={datasource} msg="Add New Data Source"></ServiceCards>
        <ServiceCards imgsrc={report} msg="Schedule new report" ></ServiceCards>
        <ServiceCards imgsrc={cloudStorage} msg="Configure new SFTP / MFT / Mail-server"></ServiceCards>
    </div>

  )
}

export default ConfigPageBody