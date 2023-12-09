import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
} from "anon-aadhaar-react";
import { useSDK } from "@metamask/sdk-react";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [signerAddress, setSignerAddress] = useState(null);

  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const [anonAadhaar] = useAnonAadhaar();

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
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
    console.log("sdk connected: ", connected);
  }, [anonAadhaar, connected]);

  return (
    <div>
      <div className="Wallet Connect">
        {/* <MetaMaskButton theme={"light"} color="white"></MetaMaskButton> */}
        <div className="App">
          <button onClick={connect}>Connect Wallet</button>
          {connected && (
            <div>
              <>
                {chainId && `Connected chain: ${chainId}`}
                <p></p>
                {account && `Connected account: ${account}`}
              </>
            </div>
          )}
        </div>
      </div>
      <div>
        <LogInWithAnonAadhaar />
        <p>{anonAadhaar?.status}</p>
      </div>
      <div>
        {/* Render the proof if generated and valid */}
        {anonAadhaar?.status === "logged-in" && (
          <>
            <p>✅ Proof is valid</p>
            <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} />
          </>
        )}
      </div>
      {/* <PushMessage signer={signer} clicked={true} /> */}
    </div>
  );
}

export default App;
