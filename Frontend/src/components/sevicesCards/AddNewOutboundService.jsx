import React from 'react'

function AddNewOutboundService() {
    return (
        <div className='flex-grow flex justify-center items-center mt-20'>
          <div className='flex bg-white p-20 flex-col items-center justify-center rounded-md'>
         
            <h1 className="mb-4 text-2xl font-bold">Add New Outbound Service</h1> 
            
            <select className="block w-64 p-2 mb-4 border border-gray-300 bg-input rounded " required  >
              <option value="">Type Of Outbound Service</option>
              <option value="smtp">SMTP</option>
              <option value="awss3">AWS S3 Bucket</option>
              <option value="sftp">SFTP</option>
            </select>
            
            
             <button className="w-full p-2 bg-btn-purple text-white rounded hover:bg-blue-600" >
              Add DataSource
            </button>
          </div>
        </div>
      )
}

export default AddNewOutboundService