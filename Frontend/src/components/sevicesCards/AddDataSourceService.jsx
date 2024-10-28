import axios from 'axios';
import React, { useEffect, useState } from 'react'



function AddDataSourceService() {
  const [btnState,setBtnState] = useState(false)
  const [dataSourceName , setDataSource] = useState('')
  const [instanceName , setInstanceName] = useState('')
  const [username , setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hostname,setHostname] = useState('')
  const [port , setPort] = useState('')
  useEffect(() => {
    if(btnState){
    axios.post(import.meta.env.VITE_ADD_DATASOURCE_ENDPOINT,{
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
     
        <h1 className="mb-4 text-2xl font-bold">Add A New Data Source</h1> 
        
        <select className="block w-64 p-2 mb-4 border border-gray-300 bg-input rounded " required onChange={(e)=> setDataSource(e.target.value)} >
          <option value="">Select Data Source Type</option>
          <option value="mysql">MySQL</option>
          <option value="postgresql">PostgreSQL</option>
          <option value="mssql">MsSQL</option>
        </select>
        <input 
          type="text" 
          placeholder="Instance name" 
          className="block w-96 p-2 mb-4 border border-gray-300 bg-input rounded" 
          required  onChange={(e)=> setInstanceName(e.target.value)}
        />
        <div className='flex'>
        <input 
          type="text" 
          placeholder="Username" 
          className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded" 
          required  onChange={(e)=> setUsername(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Password" 
          className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded" 
          required  onChange={(e)=> setPassword(e.target.value)}
        />
        </div>
        <div className='flex'>
        <input 
          type="text" 
          placeholder="Hostname" 
          className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded" 
          required  onChange={(e)=> setHostname(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Port" 
          className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded" 
          required  onChange={(e)=> setPort(e.target.value)}
        />
        </div>
         <button className="w-full p-2 bg-btn-purple text-white rounded hover:bg-blue-600" onClick={handleButtonClick}>
          Add DataSource
        </button>
      </div>
    </div>
  )
}

export default AddDataSourceService
