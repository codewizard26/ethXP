import React, { useEffect } from 'react'
import lighthouse from '@lighthouse-web3/sdk'

const getUploads = async () => {
    /*
      @param {string} apiKey - Your API key.
      @param {number} [pageNo=1] - The page number for pagination, defaults to 1.
    */
    const response = await lighthouse.getUploads("YOUR_API_KEY");
    console.log(response);
  
    // Process the response or store it in state for further use
    return response.data.fileList;
  };

function Retrieve() {
    const getUploads = async() =>{
        /*
          @param {string} apiKey - Your API key.
          @param {number} [pageNo=1] - The page number for pagination, defaults to 1.
        */
        const response = await lighthouse.getUploads("535dec75.c7a1a9d86768459ead1ccac234bcb89b")
        console.log(response)
    }

    useEffect(() => {
        // Fetch uploaded files when component mounts
        const fetchData = async () => {
          try {
            const uploads = await getUploads();
            console.log("Uploaded files:", uploads);
            // Store 'uploads' in state or perform other actions with the data
          } catch (error) {
            console.error("Error fetching uploads:", error);
          }
        };
    
        fetchData(); // Call the function to fetch uploads
      }, []);
  return (
    <div>
        reviewer portal
    </div>
  )
}

export default Retrieve