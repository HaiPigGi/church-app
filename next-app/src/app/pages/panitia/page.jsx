// panitia/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { fetchPanitiaStatus } from '@/app/api/Admin/panitia/route';

const Panitia = () => {
  const [showViewA, setShowViewA] = useState(0); // Default status is set to 0 // 0 untuk default status coming soon

  const getDataStatus = async () => {
    try {
      const data = await fetchPanitiaStatus();
      setShowViewA(data.status); // Update state here
      console.log(data.response);
    } catch (error) {
      console.error('Error fetching Panitia status:', error);
    }
  };
  useEffect(() => {
    getDataStatus();
  }, []);

  let statusText = '';

  // Adjust text based on the received status
  switch (showViewA) {
    case 0:
      statusText = 'Coming Soon';
      break;
    case 1:
      statusText = 'Panitia Natal';
      break;
    case 2:
      statusText = 'Panitia Paskah';
      break;
    default:
      statusText = 'Unknown Status';
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container p-4 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Panitia</h2>
        <div className="mb-4">
          <p className="text-lg text-center">Status: {statusText}</p>
        </div>
      </div>
    </div>
  );
};

export default Panitia;
