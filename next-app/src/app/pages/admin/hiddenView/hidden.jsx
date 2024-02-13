// pages/admin.js
import { useState, useEffect } from 'react';
import { toggleView, fetchPanitiaStatus } from '@/app/api/Admin/panitia/route';

const hidden = () => {
  const [showViewA, setShowViewA] = useState(true);

  const triggredToggle = async (newStatus) => {
    try {
      const data = await toggleView(newStatus);
      setShowViewA(data.status); // Update state here
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const getDataStatus = async () => {
    try {
      const data = await fetchPanitiaStatus(); //get From API
      setShowViewA(data.status); // Update state here
      console.log(data.response);
    } catch (error) {
      console.error('Error fetching Panitia status:', error);
    }
  };

  useEffect(() => {
    getDataStatus();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="mb-4 min-[360px]:max-[765px]:items-center">
        <button
          onClick={() => triggredToggle(0)} // Tampilan A
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2
          min-[360px]:max-[765px]:mb-5"
        >
          Toggle Coming Soon
        </button>
        <button
          onClick={() => triggredToggle(1)} // Tampilan B
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2
          min-[360px]:max-[765px]:mb-5"
        >
          Toggle Panitia Natal
        </button>
        <button
          onClick={() => triggredToggle(2)} // Tampilan C
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2
          min-[360px]:max-[765px]:mb-5"
        >
          Toggle Paskah
        </button>
        <p className="ml-2 ">Status: {getStatusText(showViewA)}</p>
      </div>
    </div>
  );
};

const getStatusText = (status) => {
  switch (status) {
    case 0:
      return 'Coming Soon';
    case 1:
      return 'Panitia Natal';
    case 2:
      return 'Panitia Paskah';
    default:
      return 'Unknown Status';
  }
};

export default hidden;
