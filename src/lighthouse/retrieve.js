import React, { useEffect } from 'react';
import lighthouse from '@lighthouse-web3/sdk';

function Retrieve() {
  const apiKey = "adeea4df.e943c207a9b84de78dc656a58fbda881"; // Replace this with your actual API key

  useEffect(() => {
    async function fetchData() {
      try {
        const keyResponse = await lighthouse.generateKey(apiKey);
        console.log('Generated key:', keyResponse.data);

        const pubResponse = await lighthouse.publishRecord(
          'QmUqoayBcenKaUUJb4ML2Xcq8NJQoRKsvC5yqhFC8g2ZFZ',
          keyResponse.data.ipnsName,
          apiKey
        );
        console.log('Published record:', pubResponse.data);

        const allKeys = await lighthouse.getAllKeys(apiKey);
        console.log('All keys:', allKeys.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, [apiKey]); // Run the effect whenever apiKey changes

  return (
    <div>
        retrieve
      {/* Your React component content */}
    </div>
  );
}

export default Retrieve;
