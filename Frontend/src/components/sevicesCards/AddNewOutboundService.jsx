import React, { useState } from 'react'

function AddNewOutboundService() {
    const [selectedOption,setSelectedOption] = useState('')
    function handleOptionSelect(val){
        setSelectedOption(val)

    }
    const [smtpDetails , setSmtpDetails] = useState('')
    
    return (
        <div className='flex-grow flex justify-center items-center mt-20'>
          <div className='flex bg-white p-20 flex-col items-center justify-center rounded-md'>
         
            <h1 className="mb-4 text-2xl font-bold">Add New Outbound Service</h1> 
            <input
              type="text"
              placeholder="Outbound Service Name"
              className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
              required
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            
            <select className="block w-64 p-2 mb-4 border border-gray-300 bg-input rounded " required  onChange={(e)=> handleOptionSelect(e.target.value)}  >
              <option value="">Type Of Outbound Service</option>
              <option value="smtp" >SMTP</option>
              <option value="awss3">AWS S3 Bucket</option>
              <option value="sftp">SFTP</option>
            </select>
            {selectedOption === 'smtp' && (
          <div>
            <div className="flex">
              <input
                type="text"
                placeholder="SMTP server"
                className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="App Password"
                className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Login_Email"
              className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
              required
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
        )}

{selectedOption === 'awss3' && (
          <div>
            <div className="flex">
              <input
                type="text"
                placeholder="Access Key"
                className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="Secret key"
                className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="AWS Region"
              className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
              required
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
        )}

{selectedOption === 'sftp' && (
          <div>
            <div className="flex">
              <input
                type="text"
                placeholder="SFTP Hostname"
                className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="port"
                className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Username"
                className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="Password"
                className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Remote File Path"
              className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
              required
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
        )}
        
             <button className="w-full p-2 bg-btn-purple text-white rounded hover:bg-blue-600" >
              Add Outbound Service
            </button>
          </div>
          </div>
       
      )
}

export default AddNewOutboundService