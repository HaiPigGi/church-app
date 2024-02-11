'use client';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getAllDokumentasi } from '@/app/api/User/Dokumentasi/routes';
import { isResponseError } from '@/app/pages/admin/posisi.jsx';
import useModalContent from '@/lib/customHooks/useModalContent.jsx';
import { useRouter } from 'next/navigation';

const Dokumentasi_kegiatan = ({ params }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchYear, setSearchYear] = useState('');
  const [groupImage, setGroupImage] = useState([
    {
      jenis_kegiatan: '',
      tahun: '',
      images: '',
    },
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [photos, setPhotos] = useState([]);
  const { modalContent, setModalContent, clearState } = useModalContent();
  const router = useRouter();

  const getDokumentasi = async (jenisKegiatan) => {
    let res = await getAllDokumentasi();
    if (isResponseError(res, setModalContent, clearState)) return;
    res = await res.json();
    res = res.data;
    res = res.filter((data) => jenisKegiatan == data.jenis_kegiatan);
    console.log(res);
    console.log('groupImage : ', groupImage);
    setPhotos(res);
  };

  const groupByYear = (photo) => {
    console.log('photo : ', photo);
    console.log('Group Image length : ', groupImage.length);
    const index = groupImage.findIndex((val) => val.tahun == photo.tahun);
    console.log('index : ', index);
    if (index != -1) {
      photo.images.map((img) => {
        groupImage[index].images.push(img);
      });
      return;
    }
    groupImage.push({
      jenis_kegiatan: photo.jenis_kegiatan,
      tahun: photo.tahun,
      images: photo.images,
    });
    console.log('groupImage : ', groupImage);
  };

  useEffect(() => {
    getDokumentasi(params.jenis_kegiatan);
  }, []);

  useEffect(() => {
    if (photos.length > 0) {
      photos.forEach((photo) => {
        groupByYear(photo);
      });
      setGroupImage(groupImage.slice(1));
      console.log('groupImage : ', groupImage);
    }
  }, [photos]);

  const photosByYear = (year) => {
    if (photos.find((data) => data.tahun == `${year}`)) {
      router.push(`/pages/dok/${params.jenis_kegiatan}/#${year}`);
      return;
    }
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setSelectedPhoto(null);
  };

  const handleGoBack = () => {
    router.push('/pages/dok/');
  };

  const handleChange = (e) => {
    let year = e.target.value;
    setSearchYear(year);
  };

  const handleSearch = () => {
    if (!searchYear) {
      setModalContent('validation', {
        message: 'Harap masukkan tahun pencarian terlebih dahulu',
        typeMessage: 'failed',
        action: clearState,
      });
      return;
    }
    let year = searchYear.slice(0, searchYear.indexOf('-'));
    photosByYear(year);
    // Tambahkan alert jika hasil pencarian kosong
    setSearchYear('');
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container mx-auto py-8 overflow-x-auto ">
      <button
        className="flex ml-5 text-secondary font-semibold mt-3 mb-5"
        onClick={handleGoBack}
      >
        <img src="/img/assets/left-arrow (1).png" className="mr-2" /> Kembali
      </button>
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Dokumentasi Natal
      </h1>

      <div className="flex justify-center mb-4">
        <input
          type="month"
          placeholder="Cari berdasarkan tahun"
          className="border border-gray-300 p-2 rounded-md"
          value={searchYear}
          onChange={handleChange}
        />
        <button
          className="ml-2 bg-secondary text-white px-4 py-2 rounded-md"
          onClick={handleSearch}
        >
          Cari
        </button>
      </div>

      {groupImage.length > 1 &&
        groupImage.map((photos) => (
          <div id={photos.tahun} key={photos.tahun} className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-center">
              {photos.tahun}
            </h2>

            <div className="flex space-x-4 overflow-x-auto ml-5">
              {photos.images.map((photo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 overflow-hidden rounded-lg shadow-md cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photos.jenis_kegiatan}
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
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Peringatan!!!
          </h2>
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
            onClick={handleClose}
          >
            <img src="/img/assets/logout (1).png" alt="" />
          </button>
        </div>
      )}
      {modalContent}
    </div>
  );
};

export default Dokumentasi_kegiatan;
