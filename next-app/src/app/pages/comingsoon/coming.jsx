
'use client'
import React from 'react';
import './index.css'; // File ini akan berisi kustomisasi Tailwind CSS

const ComingSoon = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              <span className="individual-letter">C</span>
              <span className="individual-letter animation-delay-1">o</span>
              <span className="individual-letter animation-delay-2">m</span>
              <span className="individual-letter animation-delay-3">i</span>
              <span className="individual-letter animation-delay-4">n</span>
              <span className="individual-letter animation-delay-5">g</span>
              <span className="individual-letter animation-delay-6">&nbsp;</span>
              <span className="individual-letter animation-delay-7">S</span>
              <span className="individual-letter animation-delay-8">o</span>
              <span className="individual-letter animation-delay-9">o</span>
              <span className="individual-letter animation-delay-10">n</span>
            </h1>
            <div className="wave"></div>
          </div>
        </div>
      );
};

export default ComingSoon;

