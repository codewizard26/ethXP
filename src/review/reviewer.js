import React from 'react'

export default function Reviewer() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md mx-auto p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-8 text-center">Reviewer Dashboard</h1>

        <div className="flex flex-col items-center space-y-4">
          {/* Button to go to Lighthouse */}
          <a href='https://files.lighthouse.storage/' target='_blank' rel='noreferrer'>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          >
            
            View Uploaded papers
          </button>
          </a>

          {/* Button to approve paper */}
          <button
            
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md focus:outline-none focus:ring focus:ring-green-400"
          >
            Approve Papers
          </button>
        </div>
      </div>
    </div>
  );
}



