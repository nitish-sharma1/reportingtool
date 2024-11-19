import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MultiSelect } from "react-multi-select-component"

function AddReportService() {
    const [btnState,setBtnState] = useState(false)
  const [reportName , setReportName] = useState('')
  const [instanceName , getInstanceName] = useState([])
  const [instanceNameVal , setInstanceName] = useState('')
  const [reportTime , setReportTime] = useState( '')
  const [range , setTimeRange] = useState([])
 
  const [query, setQuery] = useState('')
  const [frequency, setFrequency] = useState([])
  const [outboundServiceName , getOutboundServiceName] = useState([])
  const [outboundServiceNameVal , setOutboundServiceName] = useState('')

  const options = [
    { label: "Monday 🍇", value: "monday" },
    { label: "Tuesday 🍇", value: "tuesday" },
    { label: "Wednesday 🍇", value: "wednesday" },
    { label: "Thrusday 🍇", value: "thrusday" },
    { label: "Friday 🍇", value: "friday" },
    { label: "Saturday 🍇", value: "saturday" },
    { label: "Sunday 🍇", value: "sunday" },
  ];

  const handleFrequencyChange = (selectedOptions) => {
    // Extract the values only
    const valuesOnly = selectedOptions.map(option => option.value);
    setFrequency(valuesOnly);
  };
  useEffect(() => {axios.get(import.meta.env.VITE_GET_INSTANCE_ENDPOINT)
    .then(
    response => {console.log(response.data)
    getInstanceName(response.data.instance_names)
    }
        
).catch(error => {console.log(error)})},[])

                                                                                                                                                                                                                                     
useEffect(() => {axios.get(import.meta.env.VITE_GET_OUTBOUND_SERVICE_ENDPOINT)
    .then(
    response => {console.log(response.data)
    getOutboundServiceName(response.data.service_name)
    }
        
).catch(error => {console.log(error)})},[])


useEffect(() => {
    let timeArray = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minutes = 0; minutes < 60; minutes += 15) {
          // Format hours and minutes to always be two digits
          const formattedTime = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
          timeArray.push(formattedTime);
      }
    }
    setTimeRange(timeArray)
},[])




  useEffect(() => {
    if(btnState){
    axios.post(import.meta.env.VITE_ADD_REPORT_ENDPOINT,{
        "instance_name" : instanceNameVal,
        "report_time" : reportTime,
        "frequency" : frequency,
        "report_name" : reportName,
        "query" : query,
        "outbound_service_name" : outboundServiceNameVal,
        "isEnabled" : true
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
          className="block w-64 p-2 mb-4 border border-grey bg-input rounded" 
          required  onChange={(e)=> setReportName(e.target.value)}
        />
        
        <select className="block w-64 p-2 mb-4 border border-grey  ml-2 bg-input rounded " required onChange={(e)=> setInstanceName(e.target.value)} >
          <option value="">Select Instance Name</option>
          {instanceName.map((name, index) => (
                    <option key={index} value={name}>{name}</option> 
                ))}
        </select>
        <select className=" block w-64 px-2 mb-4 border border-grey ml-2   bg-input rounded " required onChange={(e)=> setOutboundServiceName(e.target.value)} >
          <option value="">Select Outbound Service</option>
          {outboundServiceName.map((name, index) => (
                    <option key={index} value={name}>{name}</option> 
                ))}
        </select>
        </div>
        <div className='flex'>
     
        <select className="  w-64 h-10 px-2 mx-2 border border-grey    bg-input rounded " required onChange={(e)=> setReportTime(e.target.value)} >
          <option value="">Select Report Timing</option>
          {range.map((time) => (
                    <option key={time} value={time}>{time}</option> 
                ))}
        </select>
        
        <MultiSelect
      options={options}
      value={options.filter(option => frequency.includes(option.value))}
      onChange={(selected) => handleFrequencyChange(selected)}
      labelledBy="Select Frequency"
      className="w-64"
    />
        </div>
        
        <label className='flex items-center w-full '>
    
            <textarea
                type="text" 
                placeholder="Query" 
                className="block w-full h-60 p-2 mb-4 m-2 border border-grey bg-input rounded" 
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