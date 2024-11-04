import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AddReportService() {
    const [btnState,setBtnState] = useState(false)
  const [reportName , setReportName] = useState('')
  const [instanceName , getInstanceName] = useState([])
  const [instanceNameVal , setInstanceName] = useState('')
  const [reportTime , setReportTime] = useState('')
  const [query, setQuery] = useState('')
  const [frequency, setFrequency] = useState('')


  useEffect(() => {axios.get(import.meta.env.VITE_GET_INSTANCE_ENDPOINT)
    .then(
    response => {console.log(response.data)
    getInstanceName(response.data.instance_names)
    }
        
).catch(error => {console.log(error)})},[])

                                                                                                                                                                                                                                     




  useEffect(() => {
    if(btnState){
    axios.post(import.meta.env.VITE_ADD_REPORT_ENDPOINT,{
        "database_type" : "mysql",
        "instance_name" : instanceNameVal,
        "report_time" : reportTime,
        "frequency" : ["monday","tuesday","wednesday"],
        "report_name" : reportName,
        "query" : query,
        "transfer_type" : "sftp"
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
          required  onChange={(e)=> setReportName(e.target.value)}
        />
        
        <select className="block w-64 p-2 mb-4 border border-gray-300  ml-2 bg-input rounded " required onChange={(e)=> setInstanceName(e.target.value)} >
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
          required  onChange={(e)=> setReportTime(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="frequency" 
          className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded" 
          required  onChange={(e)=> setFrequency(e.target.value)}
        />
        </div>
        
        <label className='flex items-center w-full '>
    
            <textarea
                type="text" 
                placeholder="Query" 
                className="block w-full h-60 p-2 mb-4 m-2 border border-gray-300 bg-input rounded" 
                required  onChange={(e)=> setQuery(e.target.value)}
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