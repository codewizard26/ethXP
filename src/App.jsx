import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
} from "anon-aadhaar-react";

function App() {
  const [anonAadhaar] = useAnonAadhaar();

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  const connectToMetaMask = () =>{
    console.log("connect to metamask")
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">SwiftPeer</h1>
        <div className="space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            onClick={connectToMetaMask}
          >
            Connect to MetaMask
          </button>
          {/* Add another button here */}
          {/* Example: */}
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-400">
           <LogInWithAnonAadhaar />
            </button>
        </div>
      </div>
    </div>
      <div>
        {anonAadhaar?.status === "logged-in" && (
          <>
            {alert("proof is valid")}
            <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;