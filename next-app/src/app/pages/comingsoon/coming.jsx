'use client';
import React from 'react';
import './index.css'; // File ini akan berisi kustomisasi Tailwind CSS
// import Vidioblog from '/img/back.mp4'

const ComingSoon = () => {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className='m-0 p-0 w-[100%] h-[100vh]'>
      <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-40 "></div>
      <video src="/img/back.mp4" autoPlay muted loop className='w-[100%] h-[100vh] object-cover'></video>
      <div className="items-center justify-center  absolute w-[100%] h-[100%] top-0 flex flex-col ">
        <div className="text-center text-white">
          <h1 className=" font-bold mb-4 space-x-5 text-9xl">
            <span className="individual-letter animation-delay-0">C</span>
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

          <a className="  text-secondary font-bold" onClick={handleGoBack}>kembali</a>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ComingSoon;
