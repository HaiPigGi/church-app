"use client"
import React, { useState } from 'react';
import { IoIosExit } from "react-icons/io";

const Gallery = () => {
  
  const photos = [
    { id: 1, title: 'Photo 1', year: 2022, url: '/img/bg-Berita.JPG' },
    { id: 1, title: 'Photo 1', year: 2022, url: '/img/abdi2.jpeg' },
    { id: 1, title: 'Photo 1', year: 2022, url: '/img/bg-Berita.JPG' },
    { id: 1, title: 'Photo 1', year: 2022, url: '/img/abdi2.jpeg' },
    { id: 1, title: 'Photo 1', year: 2022, url: '/img/bg-Berita.JPG' },
    { id: 1, title: 'Photo 1', year: 2022, url: '/img/bg-Berita.JPG' },
    { id: 1, title: 'Photo 1', year: 2022, url: '/img/bg-Berita.JPG' },
    { id: 1, title: 'Photo 1', year: 2022, url: '/img/bg-Berita.JPG' },
    { id: 1, title: 'Photo 1', year: 2022, url: '/img/bg-Berita.JPG' },
    { id: 1, title: 'Photo 1', year: 2022, url: '/img/bg-Berita.JPG' },
    { id: 1, title: 'Photo 1', year: 2022, url: '/img/bg-Berita.JPG' },

    { id: 2, title: 'Photo 2', year: 2021, url: 'https://placekitten.com/401/300' },
    { id: 2, title: 'Photo 2', year: 2021, url: 'https://placekitten.com/401/300' },  
    { id: 3, title: 'Photo 3', year: 2023, url: 'https://placekitten.com/402/300' },
    { id: 3, title: 'Photo 3', year: 2023, url: 'https://placekitten.com/402/300' },
 
  ];

  const photosByYear = photos.reduce((acc, photo) => {
    const year = photo.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(photo);
    return acc;
  }, {});

  const [selectedPhoto, setSelectedPhoto] = useState(null);


  const handleClose = () => {
    setSelectedPhoto(null);
  };
  const handleGoBack = () => {
    window.history.back();
  };
  

  return (
    <div className="container mx-auto py-8 overflow-x-auto">
      <button className='flex ml-5 text-secondary font-semibold mt-3' onClick={handleGoBack}>
      <img src="/img/assets/left-arrow (1).png" className='mr-2'/> Kembali
      </button>
      <h1 className="text-3xl font-semibold mb-6 text-center">Dokumentasi Natal</h1>


      {Object.keys(photosByYear).map((year) => (
        <div key={year} className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-center">{year}</h2>

          <div className="flex space-x-4  overflow-x-auto ml-5">
            {photosByYear[year].map((photo) => (
              <div
                key={photo.id}
                className="flex-shrink-0 overflow-hidden rounded-lg shadow-md cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-52 h-56 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedPhoto && (
        <div className="fixed top-0 left-0 w-full h-full bg-neutral-950 bg-opacity-75 flex items-center justify-center ">
          <img
            src={selectedPhoto.url}
            alt={selectedPhoto.title}
            className="max-w-full max-h-full"/>
          <button
            className="absolute top-4 right-4 h-10 w-10 text-white"
            onClick={handleClose}>
            <img src="/img/assets/logout (1).png" alt="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;