import { useEffect,useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
} from "anon-aadhaar-react";
import { ethers } from "ethers";
import { useSDK } from "@metamask/sdk-react";
import { Link } from 'react-router-dom';



function App() {


  const [anonAadhaar] = useAnonAadhaar();

  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(null);
  const [mConnected,isConnected] = useState(false)

  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      console.log(`accounts`, accounts);
      setAccount(accounts?.[0]);
      const _provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = _provider.getSigner();
      const signerAddress = await signer.getAddress();
      setSigner(signer);
      setSignerAddress(signerAddress);
      console.log(`signerAddress`, signerAddress);
      isConnected(true)
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
    console.log("sdk connected: ", connected);


    
  }, [anonAadhaar, connected]);


  const connectToMetaMask = () =>{
    console.log("connect to metamask")
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">SwiftPeer</h1>
        <p>A platform solely for the researchers and scholors</p>
        {anonAadhaar?.status === 'logged-in' && mConnected && (
        <Link to="/home" ><button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
           // Replace yourOnClickHandler with your actual onClick handler
        >
          Proceed
        </button></Link>
      )}
        <div className="space-x-4">
      {mConnected ? (
        <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
      >
        Connected
      </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          onClick={connect}
        >
          Connect to MetaMask
        </button>
      )}

          {/* Add another button here */}
          {/* Example: */}
          <button className=" text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-400">
           <LogInWithAnonAadhaar />
            </button>
        </div>
      </div>
    </div>
      <div>
        {anonAadhaar?.status === "logged-in" && (
          <>
            <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} />
          </>
        )}



        
      </div>

    </div>
  );
}

export default App;