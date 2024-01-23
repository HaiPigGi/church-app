import React, { useState } from 'react';
import Panitia from '../panitia/page';
import Hidden from './hidden';

const nothidden = () => {
  const [showViewA, setShowViewA] = useState(true);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Halaman Utama</h1>

      <Hidden setViewA={setShowViewA} />

      <Panitia showViewA={showViewA} />
    </div>
  );
};

export default nothidden;
