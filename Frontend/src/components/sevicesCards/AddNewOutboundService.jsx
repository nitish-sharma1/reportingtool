import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AddNewOutboundService() {
    const [selectedOption, setSelectedOption] = useState('');
    const [outboundServiceName, setOutboundServiceName] = useState('');
    const [smtpServer, setSmtpServer] = useState('');
    const [appPassword, setAppPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [accessKey, setAccessKey] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [awsRegion, setAwsRegion] = useState('');
    const [sftpHostname, setSftpHostname] = useState('');
    const [sftpPort, setSftpPort] = useState('');
    const [sftpUsername, setSftpUsername] = useState('');
    const [sftpPassword, setSftpPassword] = useState('');
    const [remoteFilePath, setRemoteFilePath] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [btnStateSmtp,setBtnStateSmtp] = useState(false);
    const [btnStateAws,setBtnStateAws] = useState(false);
    const [btnStatemft,setBtnStatemft] = useState(false);

    const handleOptionSelect = (val) => {
        setSelectedOption(val);
        setErrorMessage(''); // Clear any existing error message
    };
    useEffect(() => {
        // handle post for smtp
        if(btnStateSmtp){
        axios.post(import.meta.env.VITE_ADD_OUTBOUNDSERVICE_ENDPOINT,{
          "datasource_type" : "dataSourceName",
          "instance_name" : "instanceName",
          "username" : "username",
          "password" : "password",
          "hostname"  : "hostname",
          "port" : 1234
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      }
      )}
      setBtnStateSmtp(false)
    }
      ,[btnStateSmtp]);


      useEffect(() => {
        // handle post for aws
        if(btnStateAws){
        axios.post(import.meta.env.VITE_ADD_OUTBOUNDSERVICE_ENDPOINT,{
          "datasource_type" : "dataSourceName",
          "instance_name" : "instanceName",
          "username" : "username",
          "password" : "password",
          "hostname"  : "hostname",
          "port" : 1234
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      }
      )}
      setBtnStateAws(false)
    }
      ,[btnStateAws]);

      useEffect(() => {
        // handle post for aws
        if(btnStatemft){
        axios.post(import.meta.env.VITE_ADD_OUTBOUNDSERVICE_ENDPOINT,{
          "datasource_type" : "dataSourceName",
          "instance_name" : "instanceName",
          "username" : "username",
          "password" : "password",
          "hostname"  : "hostname",
          "port" : 1234
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      }
      )}
      setBtnStatemft(false)
    }
      ,[btnStatemft]);


    const handleSubmit = () => {
        if (!outboundServiceName) {
            setErrorMessage('Please provide an Outbound Service Name.');
            return;
        }
       

        switch (selectedOption) {
            case 'smtp':
                if (!smtpServer || !appPassword || !loginEmail) {
                    setErrorMessage('Please fill in all SMTP details.');
                    return;
                }
                else{
                    setBtnStateSmtp(btnStateSmtp+1);
                      
                }
                break;
            case 'awss3':
                if (!accessKey || !secretKey || !awsRegion) {
                    setErrorMessage('Please fill in all AWS S3 details.');
                    return;
                }
                else{
                    setBtnStateAws(btnStateAws+1);
                      
                }
                break;
            case 'sftp':
                if (!sftpHostname || !sftpPort || !sftpUsername || !sftpPassword || !remoteFilePath) {
                    setErrorMessage('Please fill in all SFTP details.');
                    return;
                }
                else{
                    setBtnStatemft(btnStatemft+1);
                      
                }
                break;
            default:
                setErrorMessage('Please select a type of Outbound Service.');
                return;
        }

        setErrorMessage(''); // Clear the error if all validations pass
        // Proceed with form submission logic here
    };

    return (
        <div className="flex-grow flex justify-center items-center mt-20">
            <div className="flex bg-white p-20 flex-col items-center justify-center rounded-md">
                <h1 className="mb-4 text-2xl font-bold">Add New Outbound Service</h1>
                <input
                    type="text"
                    placeholder="Outbound Service Name"
                    className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
                    value={outboundServiceName}
                    onChange={(e) => setOutboundServiceName(e.target.value)}
                    required
                />

                <select
                    className="block w-64 p-2 mb-4 border border-gray-300 bg-input rounded"
                    value={selectedOption}
                    onChange={(e) => handleOptionSelect(e.target.value)}
                    required
                >
                    <option value="">Type Of Outbound Service</option>
                    <option value="smtp">SMTP</option>
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
                                value={smtpServer}
                                onChange={(e) => setSmtpServer(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="App Password"
                                className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded"
                                value={appPassword}
                                onChange={(e) => setAppPassword(e.target.value)}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Login_Email"
                            className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
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
                                value={accessKey}
                                onChange={(e) => setAccessKey(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Secret key"
                                className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded"
                                value={secretKey}
                                onChange={(e) => setSecretKey(e.target.value)}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="AWS Region"
                            className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
                            value={awsRegion}
                            onChange={(e) => setAwsRegion(e.target.value)}
                            required
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
                                value={sftpHostname}
                                onChange={(e) => setSftpHostname(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Port"
                                className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded"
                                value={sftpPort}
                                onChange={(e) => setSftpPort(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Username"
                                className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded"
                                value={sftpUsername}
                                onChange={(e) => setSftpUsername(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Password"
                                className="block w-64 p-2 mb-4 m-2 border border-gray-300 bg-input rounded"
                                value={sftpPassword}
                                onChange={(e) => setSftpPassword(e.target.value)}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Remote File Path"
                            className="block w-full p-2 mb-4 border border-gray-300 bg-input rounded"
                            value={remoteFilePath}
                            onChange={(e) => setRemoteFilePath(e.target.value)}
                            required
                        />
                    </div>
                )}

                {errorMessage && (
                    <div className="text-red-500 mb-4">{errorMessage}</div>
                )}

                <button
                    className="w-full p-2 bg-btn-purple text-white rounded hover:bg-blue-600"
                    onClick={handleSubmit}
                >
                    Add Outbound Service
                </button>
            </div>
        </div>
    );
}

export default AddNewOutboundService;
