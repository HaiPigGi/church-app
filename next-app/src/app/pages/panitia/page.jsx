// panitia/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { fetchPanitiaStatus } from '@/app/api/Admin/panitia/route';
import ComingSoon from '@/app/pages/comingsoon/page';
import Natal from '@/app/pages/panitia/natal'
import Paskah from './paskah';

const Panitia = () => {
  const [showViewA, setShowViewA] = useState(0); // Default status is set to 0 // 0 untuk default status coming soon

  const getDataStatus = async () => {
    try {
      const data = await fetchPanitiaStatus();
      setShowViewA(data.status); // Update state here
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
      statusText = <ComingSoon/>;
      break;
    case 1:
      statusText = <Natal />;
      break;
    case 2:
      statusText = <Paskah/>;
      break;
    default:
      statusText = 'Unknown Status';
  }

  return (
          <div>{statusText}</div>
  );
};

export default Panitia;
