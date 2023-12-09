import React, { useState,useEffect } from "react";
import lighthouse from "@lighthouse-web3/sdk";

function UploadL() {
  const [file, setFile] = useState(null);
  const [cId, setId] = useState("");
  const [sign,setSign] = useState("")
  const apiKey = "adeea4df.e943c207a9b84de78dc656a58fbda881";

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
      setSign(signature)

    console.log("1",file)
    console.log("2",apiKey)
    console.log("3",signerAddress)
    console.log("4",signature)

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
      const publicKey = '0x0Ba95Ca56C9740311621619834463a71b5591C9E';
      const signedMessage = await signAuthMessage();
      const publicKeyUserB = ["0x279317E79E6533837b52B117875C717fAb9453AA"];

      console.log(cid, "CID value");

      const shareResponse = await lighthouse.shareFile(
        signedMessage?.signerAddress,
        publicKeyUserB,
        cid,
        signedMessage?.signature
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
    <div className="App bg-gray-800 min-h-screen flex items-center justify-center">
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-8 text-center">Hello Researcher</h1>
      
      <div className="flex flex-col items-center">
        {/* File Upload */}
        <div className="mb-6 flex flex-col items-center">
          <input type="file" onChange={handleFileChange} className="mb-2" />
          <div className="text-xs text-gray-500">
            {file ? file.name : "No file chosen"}
          </div>
          <button onClick={uploadEncryptedFile} disabled={!file} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400">
            Upload Encrypted File
          </button>
        </div>

        {/* SVG in the center */}
        <div className="flex items-center justify-center my-4">
          <svg
            className="h-32 w-32 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* Your SVG code here */}
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
  );
}

export default UploadL;
