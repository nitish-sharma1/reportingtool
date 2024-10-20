import React from 'react'
import NavBar from './NavBar'
import ConfigPageBody from './ConfigPageBody'

function ConfigPage() {
  return (
    <div className='bg-off-white flex flex-col h-screen'>
        <NavBar></NavBar>
        <ConfigPageBody></ConfigPageBody>

    
    </div>
  )
}

export default ConfigPage