import React, { useState, useEffect } from 'react';
import axios from 'axios';

function YourReportsBody() {
  const [reports, setReports] = useState([]); // State to hold the reports data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  // Function to handle PUT call
  const handleUpdateReportStatus = (reportId) => {

    const url = `http://localhost:5000/api/v1/change-report-status/${reportId}`;

    axios
      .put(url)
      .then((res) => {
        console.log('Report status updated:', res.data);
        // Optionally, update the specific report status in the `reports` state
        setReports((prevReports) =>
          prevReports.map((report) =>
            report._id?.$oid === reportId
              ? { ...report, isEnabled: !report.isEnabled }
              : report
          )
        );
      })
      .catch((err) => {
        console.error('Error updating report status:', err.message);
        setError(`Failed to update report: ${err.message}`);
      })
    
  };

  // Fetch all reports on mount
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_GET_All_REPORTS)
      .then((response) => {
        const reportData = response.data; // Directly use the response as it is an array
        if (Array.isArray(reportData)) {
          setReports(reportData); // Set the fetched data
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch((err) => {
        setError(err.message); // Handle errors
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  }, []);

  if (loading) {
    return (
      <div className="flex-grow flex justify-center items-center mt-20">
        <div className="text-lg font-bold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow flex justify-center items-center mt-20">
        <div className="text-lg font-bold text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex justify-center">
      <div className="flex bg-transparent p-20 flex-col items-center rounded-md">
        <h1 className="mb-8 text-btn-purple text-2xl font-extrabold leading-none tracking-tight">
          Your Scheduled Reports
        </h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-btn-purple text-white">
              <tr>
                
                <th scope="col" className="px-6 py-3">
                  Report Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Instance Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Report Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Frequency
                </th>
                <th scope="col" className="px-6 py-3">
                  Outbound Service
                </th>
                <th scope="col" className="px-6 py-3">
                  Report Status
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No reports available.
                  </td>
                </tr>
              ) : (
                reports.map((report, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    
                    <td className="px-6 py-4">{report.report_name}</td>
                    <td className="px-6 py-4">{report.instance_name}</td>
                    <td className="px-6 py-4">{report.report_time}</td>
                    <td className="px-6 py-4">{report.frequency?.join(', ') || 'N/A'}</td>
                    <td className="px-6 py-4">{report.outbound_service_name || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleUpdateReportStatus(report._id?.$oid || '')}
                       
                      >
                        { report.isEnabled
                          ? 'Enabled'
                          : 'Disabled'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default YourReportsBody;
