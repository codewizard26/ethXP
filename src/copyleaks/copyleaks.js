import React, { useState } from "react";
import researchPaperImage from "../assets/research-paper.svg"; // Replace this with the actual path to your SVG file

const Copyleaks = () => {
  const [bearerToken, setBearerToken] = useState("");
  const [scanResponse, setScanResponse] = useState("");
  const [scanStarted, setScanStarted] = useState(false);

  const getBearerToken = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const dataString = JSON.stringify({
        email: "mishranikhil0532@gmail.com",
        key: "00000000-0000-0000-0000-000000000000",
      });

      const response = await fetch(
        "https://id.copyleaks.com/v3/account/login/api",
        {
          method: "POST",
          headers: headers,
          body: dataString,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        setBearerToken(token);
        console.log("Bearer Token:", token);
      } else {
        throw new Error("Failed to fetch bearer token");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const submitFileForScan = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      };

      const dataString = JSON.stringify({
        url: "http://example.com",
        properties: {
          // Your properties for scanning...
        },
      });

      const response = await fetch(
        "https://api.copyleaks.com/v3/scans/submit/url/my-custom-id",
        {
          method: "PUT",
          headers: headers,
          body: dataString,
        }
      );

      if (response.ok) {
        const scanData = await response.json();
        setScanResponse(scanData);
        console.log("Scan Response:", scanData);
      } else {
        throw new Error("Failed to submit scan");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleScanButtonClick = async () => {
    if (!bearerToken) {
      await getBearerToken();
    }
    setScanStarted(true);
    await submitFileForScan();
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    // Perform the upload logic with the selected file (selectedFile)
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      // Here you can add logic to upload the file to the server or process it further
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
      <div className="max-w-3xl flex p-8 rounded-lg shadow-xl bg-gray-800">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6">Research Upload Platform</h1>
          <p className="text-lg mb-8">
            Welcome to our platform where you can upload and manage your
            research papers.
          </p>
          <label
            htmlFor="file-upload"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline"
          >
            Upload Research
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={handleUploadClick}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-4 focus:outline-none focus:shadow-outline"
          >
            Process File
          </button>
        </div>
      </div>
    </div>
  );
};

export default Copyleaks;
