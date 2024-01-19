"use client"
import React, { useState } from 'react';
import { IoIosExit } from "react-icons/io";
import Modal from 'react-modal';


const GalleryPaskah = () => {
  
    const unsplashImage = 'https://source.unsplash.com/500x500';
  const photos = [
    { id: 1, title: 'Photo 1', year: 2022, url: unsplashImage },
    { id: 1, title: 'Photo 1', year: 2022, url: unsplashImage },
    { id: 1, title: 'Photo 1', year: 2022, url: unsplashImage },
    { id: 1, title: 'Photo 1', year: 2022, url: unsplashImage},
    { id: 1, title: 'Photo 1', year: 2022, url: unsplashImage },
    { id: 1, title: 'Photo 1', year: 2022, url: unsplashImage },
    { id: 1, title: 'Photo 1', year: 2022, url: unsplashImage },
    { id: 1, title: 'Photo 1', year: 2022, url: unsplashImage },
    { id: 1, title: 'Photo 1', year: 2022, url: unsplashImage },
    { id: 1, title: 'Photo 1', year: 2022, url: unsplashImage },
    { id: 1, title: 'Photo 1', year: 2022, url: unsplashImage },

    { id: 2, title: 'Photo 2', year: 2021, url: unsplashImage },
    { id: 2, title: 'Photo 2', year: 2021, url: unsplashImage },  
    { id: 3, title: 'Photo 3', year: 2023, url: unsplashImage },
    { id: 3, title: 'Photo 3', year: 2023, url: unsplashImage },
 
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
  const [searchYear, setSearchYear] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClose = () => {
    setSelectedPhoto(null);
  };

  const handleGoBack = () => {
    window.history.back();
  };
  const handleSearch = () => {
    const result = photosByYear[searchYear] || [];
    setSearchResult({ [searchYear]: result });

    // Tambahkan alert jika hasil pencarian kosong
    if (result.length === 0) {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  

  return (
    <div className="container mx-auto py-8 overflow-x-auto ">
      <button className='flex ml-5 text-secondary font-semibold mt-3' onClick={handleGoBack}>
        <img src="/img/assets/left-arrow (1).png" className='mr-2'/> Kembali
      </button>
      <h1 className="text-3xl font-semibold mb-6 text-center">Dokumentasi Paskah</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Cari berdasarkan tahun"
          className="border border-gray-300 p-2"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
        />
        <button className="ml-2 bg-blue-500 text-white px-4 py-2" onClick={handleSearch}>
          Cari
        </button>
      </div>

      {Object.keys(searchResult).map((year) => (
        <div key={year} className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-center">{year}</h2>

          <div className="flex space-x-4  overflow-x-auto ml-5">
            {searchResult[year].map((photo) => (
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

      {/* Modal for Empty Search Result */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Empty Search Result Modal"
        className="m-auto w-1/2 bg-white rounded-md p-8"
      >
        <div className='flex flex-col'>
        <h2 className="text-2xl font-semibold mb-4 text-center">Peringatan!!!</h2>
        <p className="text-red-500 text-center">
          Tidak ada foto untuk tahun {searchYear}.
        </p>
        <button
          className="bg-red-600 text-white px-4 py-2 mt-4 rounded-md w-28 mx-auto"
          onClick={closeModal}
          >
          Tutup
        </button>
        </div>
      </Modal>

      {selectedPhoto && (
        <div className="fixed top-0 left-0 w-full h-full bg-neutral-950 bg-opacity-75 flex items-center justify-center ">
          <img
            src={selectedPhoto.url}
            alt={selectedPhoto.title}
            className="max-w-full max-h-full"
          />
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

export default GalleryPaskah;