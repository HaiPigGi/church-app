'use client';
import React from 'react';
import './index.css'; // File ini akan berisi kustomisasi Tailwind CSS

const ComingSoon = () => {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4 space-x-5">
            <span className="individual-letter">C</span>
            <span className="individual-letter animation-delay-1">O</span>
            <span className="individual-letter animation-delay-2">M</span>
            <span className="individual-letter animation-delay-3">I</span>
            <span className="individual-letter animation-delay-4">N</span>
            <span className="individual-letter animation-delay-5">G</span>
            <span className="individual-letter animation-delay-6">&nbsp;</span>
            <span className="individual-letter animation-delay-7">S</span>
            <span className="individual-letter animation-delay-8">O</span>
            <span className="individual-letter animation-delay-9">O</span>
            <span className="individual-letter animation-delay-10">N</span>
          </h1>
          <div className="wave mt-10">

          <a className="  text-secondary " onClick={handleGoBack}>
        kembali
      </a>
          </div>
        </div>
      </div>
    
  );
};

export default ComingSoon;
