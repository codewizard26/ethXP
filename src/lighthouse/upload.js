import React, { useState,useEffect } from "react";
import lighthouse from "@lighthouse-web3/sdk";

function UploadL() {
  const [file, setFile] = useState(null);
  const [cId, setId] = useState("");
  const apiKey = "535dec75.c7a1a9d86768459ead1ccac234bcb89b";

  useEffect(() => {
    if (cId !== "") {
      console.log("CID has updated:", cId);
      shareFile(); // Move shareFile call inside useEffect
    } else {
      console.log("CID not obtained yet");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cId]);

  const signAuthMessage = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        if (accounts.length === 0) {
          throw new Error("No accounts returned from Wallet.")
        }
        const signerAddress = accounts[0]
        const { message } = (await lighthouse.getAuthMessage(signerAddress)).data
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [message, signerAddress],
        })
        return { signature, signerAddress }
      } catch (error) {
        console.error("Error signing message with Wallet", error)
        return null
      }
    } else {
      console.log("Please install Wallet!")
      return null
    }
  }

  const uploadEncryptedFile = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    try {
      const encryptionAuth = await signAuthMessage();
      if (!encryptionAuth) {
        console.error("Failed to sign the message.");
        return;
      }

      console.log(encryptionAuth, "above")


      const { signature, signerAddress } = encryptionAuth;

      console.log(signature, "sign below")


      const output = await lighthouse.uploadEncrypted(
        file,
        apiKey,
        signerAddress,
        signature,
        () => {}
      );
      console.log("Encrypted File Status:", output);

      

      if (output && output.data && output.data[0] && output.data[0].Hash) {
        setId(`${output.data[0].Hash}`);
        console.log(`CID: ${output.data[0].Hash}`);
      } else {
        console.error("Invalid CID obtained.");
      }
    } catch (error) {
      console.error("Error uploading encrypted file:", error);
    }
  };

  const shareFile = async () => {
    console.log(cId,"chla")
    try {
      // Check if CID is available before proceeding
      // Rest of your code for sharing the file
      // Ensure 'cId' has the correct CID value

      const cid = cId // Use the obtained CID
      const publicKey = '0x0313922d9E9243B12f6FF1172b965fA8FF8bd31F';
      const signedMessage = "SIGNATURE";
      const publicKeyUserB = ["0x279317E79E6533837b52B117875C717fAb9453AA"];

      console.log(cid, "CID value");

      const shareResponse = await lighthouse.shareFile(
        publicKey,
        publicKeyUserB,
        cid,
        signedMessage
      );

      console.log("Share Response:", shareResponse);
    } catch (error) {
      console.error("Error sharing file:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="App">
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Hello Researcher</h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
          {/* File Upload */}
          <div className="mb-6 md:mb-0 md:mr-4 flex items-center">
            
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadEncryptedFile} disabled={!file}>
        Upload Encrypted File
      </button>
          </div>

          {/* SVG on the right */}
          <div className="flex-shrink-0">
            <svg
              className="h-32 w-32 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Your SVG code here */}
              {/* Example: */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}

export default UploadL;
