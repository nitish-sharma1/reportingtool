import React, { useEffect, useState } from 'react'



function AddDataSourceService() {
  const [data,setData] = useState(null)

  useEffect(() => {
    fetch(import.meta.env.VITE_ADD_DATASOURCE_ENDPOINT)
    .then(response => response.json())
    .then(json => setData(json))
    .catch(error => console.error(error));
  },[]);



  return (
    <div className='flex-grow flex justify-center items-center mt-20'>
      <div className='flex bg-white p-20 flex-col items-center justify-center rounded-md'>
     
        <h1 className="mb-4 text-2xl font-bold">Add A New Data Source</h1> 
        
        <select className="block w-64 p-2 mb-4 border border-gray-300 bg-input rounded " required >
          <option value="">Select Data Source Type</option>
          <option value="mysql">MySQL</option>
          <option value="postgresql">PostgreSQL</option>
          <option value="mssql">MsSQL</option>
        </select>
        <input 
          type="text" 
          placeholder="Instance name" 
          className="block w-96 p-2 mb-4 border border-gray-300 bg-input rounded" 
          required  
        />
        <div className='flex'>
        <input 
          type="text" 
          placeholder="Username" 
          className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded" 
          required  
        />
        <input 
          type="text" 
          placeholder="Password" 
          className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded" 
          required  
        />
        </div>
        <div className='flex'>
        <input 
          type="text" 
          placeholder="Hostname" 
          className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded" 
          required  
        />
        <input 
          type="text" 
          placeholder="Port" 
          className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded" 
          required  
        />
        </div>
         <button className="w-full p-2 bg-btn-purple text-white rounded hover:bg-blue-600">
          Add DataSource
        </button>
      </div>
    </div>
  )
}

export default AddDataSourceService
