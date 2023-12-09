import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import UploadL from "./lighthouse/upload.js";
import Retrieve from "./lighthouse/retrieve.js";
import Home from "./Home.js";
import Reviewer from "./review/reviewer.js";


// const app_id = process.env.ANON_ID || "";

const app_id = "32264072653126709394981725858569696192682262528";

console.log("app_id", app_id);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AnonAadhaarProvider _appId={app_id} _testing={true}>
    <Router>
      <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<App />} />
        <Route path="/upload" element={<UploadL />} />
        <Route path="/reviewer" element= {<Reviewer/>} />

        {/* This is similar to Switch in v5 - the first matching Route will be rendered */}
      </Routes>
      </div>
      
    </Router>
    </AnonAadhaarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
