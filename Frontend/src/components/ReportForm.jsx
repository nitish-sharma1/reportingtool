import React from 'react'

function ReportForm() {
  return (
   <div>
    <input type='text' className='reportinput' placeholder='report name'></input>
    <label >Select Database:</label>
    <select>
      <option value="mssql">MSSQL</option>
      <option value="mysql">MySQL</option>
      <option value="postgres">postgres</option>
    </select>
    <label >Select Db Instance:</label>
    <select>
      <option value="awsproddb">awsproddb</option>
      <option value="localmysqldb">localmysqldb</option>
      <option value="localpostgresdb">localpostgresdb</option>
    </select>
    <label>Add Query for the Report:</label>
    <textarea className='querytextarea' placeholder='Write your query here...' rows='5'></textarea>

    
   </div>
  )
}

export default ReportForm