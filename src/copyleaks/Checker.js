import React, { useState } from 'react';

const CopyleaksIntegration = () => {
  const [bearerToken, setBearerToken] = useState('');
  const [scanResponse, setScanResponse] = useState('');
  const [scanStarted, setScanStarted] = useState(false);

  const getBearerToken = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json'
      }; 

      const dataString = JSON.stringify({
        email: 'mishranikhil0532@gmail.com',
        key: '1d566654-5e5c-48e8-815f-0139e2c006d6'
      });

      const response = await fetch('https://id.copyleaks.com/v3/account/login/api', {
        method: 'POST',
        headers: headers,
        body: dataString
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        setBearerToken(token);
        console.log('Bearer Token:', token);
      } else {
        throw new Error('Failed to fetch bearer token');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const submitFileForScan = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`
      };

      const dataString = JSON.stringify({
        url: 'http://example.com',
        properties: {
          // Your properties for scanning...
        }
      });

      const response = await fetch('https://api.copyleaks.com/v3/scans/submit/url/my-custom-id', {
        method: 'PUT',
        headers: headers,
        body: dataString
      });

      if (response.ok) {
        const scanData = await response.json();
        setScanResponse(scanData);
        console.log('Scan Response:', scanData);
      } else {
        throw new Error('Failed to submit scan');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleScanButtonClick = async () => {
    if (!bearerToken) {
      await getBearerToken();
    }
    setScanStarted(true);
    await submitFileForScan();
  };

  return (
    <div>
      <button onClick={handleScanButtonClick} disabled={scanStarted}>
        {scanStarted ? 'Scanning...' : 'Start Scan'}
      </button>
      {scanResponse && (
        <div>
          <h3>Scan Response:</h3>
          <pre>{JSON.stringify(scanResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CopyleaksIntegration;
