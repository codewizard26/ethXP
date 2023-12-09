// src/components/LandingPage.js

import React, {useRef} from 'react';
import researchPaperImage from './research.svg';
import { Link } from 'react-router-dom';

const Home = () => {


  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
        <div className="flex-1 p-36">
          <h1 className="text-4xl font-bold mb-6">Researcher Platform</h1>
          <p className="text-lg mb-8 ">
            Welcome to our platform where you can upload and manage your research papers in a completely decentralized way no hustle of waiting for so long to get your work published and verified with the power of blockchain to own and ai to check uniqueness and relations
          </p>
          <button  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
           <Link to="/upload">Upload Research</Link> 
          </button>
          <button className="bg-blue-500 ml-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <Link to= "/reviewer">Review Researches</Link>
          </button>
        </div>
        <div className="flex-1 flex  items-center">
          <img src={researchPaperImage} alt="Research Paper" className="h-100" />
          {/* Adjust the height (h-40) and styles according to your SVG */}
        </div>
    </div>
  );
};

export default Home;
