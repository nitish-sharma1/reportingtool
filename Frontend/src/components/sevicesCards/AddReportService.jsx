import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AddReportService() {
    const [btnState,setBtnState] = useState(false)
  const [dataSourceName , setDataSource] = useState('')
  const [instanceName , getInstanceName] = useState([])
  const [username , setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hostname,setHostname] = useState('')
  const [port , setPort] = useState('')


  useEffect(() => {axios.get(import.meta.env.VITE_GET_INSTANCE_ENDPOINT)
    .then(
    response => {console.log(response.data)
    getInstanceName(response.data.instance_names)
    }
        
).catch(error => {console.log(error)})},[])






  useEffect(() => {
    if(btnState){
    axios.post(import.meta.env.VITE_ADD_REPORT_ENDPOINT,{
      "datasource_type" : dataSourceName,
      "instance_name" : instanceName,
      "username" : username,
      "password" : password,
      "hostname"  : hostname,
      "port" : parseInt(port,10)
  }).then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  }
  )}
  setBtnState(false)
}
  ,[btnState]);
  function handleButtonClick() {
    setBtnState(btnState+1)
  }

  return (
    <div className='flex-grow flex justify-center items-center mt-20'>
      <div className='flex bg-white p-20 flex-col items-center justify-center rounded-md'>
     
        <h1 className="mb-4 text-2xl font-bold">Configure A New Report</h1> 
        <div className='flex'>
        <input 
          type="text" 
          placeholder="Report Name" 
          className="block w-64 p-2 mb-4 border border-gray-300 bg-input rounded" 
          required  onChange={(e)=> setInstanceName(e.target.value)}
        />
        
        <select className="block w-64 p-2 mb-4 border border-gray-300  ml-2 bg-input rounded " required onChange={(e)=> setDataSource(e.target.value)} >
          <option value="">Select Instance Name</option>
          {instanceName.map((name, index) => (
                    <option key={index} value={name}>{name}</option> // Using name as both value and display
                ))}
        </select>
        </div>
        <div className='flex'>
        <input 
          type="text" 
          placeholder="Report Time" 
          className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded" 
          required  onChange={(e)=> setUsername(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="frequency" 
          className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded" 
          required  onChange={(e)=> setPassword(e.target.value)}
        />
        </div>
        
        <label className='flex items-center w-full '>
    
            <textarea
                type="text" 
                placeholder="Query" 
                className="block w-full h-60 p-2 mb-4 m-2 border border-gray-300 bg-input rounded" 
                required  onChange={(e)=> setHostname(e.target.value)}
                />
        </label>
        
        
      
         <button className="w-full p-2 bg-btn-purple text-white rounded hover:bg-blue-600" onClick={handleButtonClick}>
          Add Report
        </button>
      </div>
    </div>
  )
}

export default AddReportService