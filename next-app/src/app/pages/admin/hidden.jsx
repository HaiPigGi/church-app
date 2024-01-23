import React, { useState } from 'react';

const Hidden = ({ setViewA }) => {
  const handleHiddenClick = () => {
    setViewA(true);
  };

  const handleNotHiddenClick = () => {
    setViewA(false);
  };

  return (
    <div>
      <button onClick={handleHiddenClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
        Hidden
      </button>
      <button onClick={handleNotHiddenClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Not Hidden
      </button>
    </div>
  );
};

export default Hidden;
