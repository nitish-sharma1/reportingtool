import React from 'react'
import NavBar from './NavBar'
import ConfigPageBody from './ConfigPageBody'
import SideBar from './SideBar'
import AddDataSourceService from './sevicesCards/AddDataSourceService'

function ConfigPage() {
  return (
    <div className='bg-off-white flex flex-col h-screen overflow-hidden'>
        <NavBar></NavBar>
        <div className='flex flex-grow'> 
        <SideBar></SideBar>
        {/* <ConfigPageBody></ConfigPageBody> */}
        <AddDataSourceService></AddDataSourceService>
        </div>
        

    
    </div>
  )
}

export default ConfigPage