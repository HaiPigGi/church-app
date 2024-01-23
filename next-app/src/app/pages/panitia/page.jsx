
import React from 'react';

const Panitia = ({ showViewA }) => {
  return (
    <div className="p-4">
      {showViewA ? (
        <div className="bg-gray-200 p-4 rounded">
          <h2 className="text-xl font-bold">Tampilan A</h2>
          <p>Konten Tampilan A</p>
        </div>
      ) : (
        <div className="bg-green-200 p-4 rounded">
          <h2 className="text-xl font-bold">Tampilan B</h2>
          <p>Konten Tampilan B</p>
        </div>
      )}
    </div>
  );
};

export default Panitia;
