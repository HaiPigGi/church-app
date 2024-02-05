// components/InputOrganisasi.js
import React, { useState, useEffect } from 'react';
import {
  get_AllOrganitations,
  put_Organitation,
  delete_Organitation,
  post_Organitation,
} from '@/app/api/Admin/organitations/route';
import Modal from '@/components/Fragments/Modal';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ModalKonfirmasi from '@/components/Fragments/Modal/ModalKonfirmasi';

const InputOrganisasi = () => {
  const [organisasi, setOrganisasi] = useState({
    organitation_id: '',
    name_organitation: '',
    description: '',
    date_of_establishment: '',
    image: '',
  });

  const [organisasiList, setOrganisasiList] = useState();
  const [loadingOrganisasiDat, setLoadingOrganisasiDat] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalContent, setModalContent] = useState('');

  const namaOrganisasiOptions = [
    'OMK',
    'Misdinar',
    'Pastoran',
    'DPP',
    'Panita Paska',
    'Panitia Natal',
  ];

  const handleDeleteEntry = async (id) => {
    //mengkosongkan isi modal
    setModalContent('');
    //mengubah loading statement
    setLoadingOrganisasiDat(true);

    //Melakukan request delete ke backend
    const res = await delete_Organitation(id);

    // Kondisi apabila terjadi error
    if (res?.error) {
      setModalContent(
        <Modal
          type="danger"
          action={() => {
            setModalContent('');
            clearInput();
          }}
          message={res.error}
        />,
      );
      return;
    }
    setOrganisasiList(res.data);
    setModalContent(
      <Modal
        type="success"
        action={() => {
          setModalContent('');
          clearInput();
        }}
        message={'Data berhasil dihapus'}
      />,
    );
    getOrganitationsData();
    return;
  };

  const handleChange = (e) => {
    setOrganisasi({ ...organisasi, [e.target.name]: e.target.value });
  };

  const handleFotoChange = (e) => {
    // Logika untuk mengelola file foto
    const file = e.target.files[0];
    // Lakukan sesuatu dengan file foto (misalnya, menyimpan ke state atau mengunggah ke server)
    setOrganisasi({ ...organisasi, [e.target.name]: file });
  };

  // konversi ke dalam bentuk Form Data
  const convertToFormData = () => {
    var formData = new FormData();
    formData.append('name_organitation', organisasi.name_organitation);
    formData.append('date_of_establishment', organisasi.date_of_establishment);
    formData.append('image', organisasi.image);
    formData.append('description', organisasi.description);
    return formData;
  };

  async function saveOrganitation() {
    // melakukan koneksi ke backend
    if (isDataOrganitationExist()) {
      const formData = convertToFormData();
      const res = await post_Organitation(formData);
      // menampilkan modal berdasarkan kondisi koneksi
      if (res?.error) {
        setModalContent(
          <Modal
            type="danger"
            action={() => {
              setModalContent('');
              clearInput();
            }}
            message={res.error}
          />,
        );
        return;
      }
      setModalContent(
        <Modal
          type="success"
          action={() => {
            setModalContent('');
            getOrganitationsData();
            clearInput();
          }}
          message="Data berhasil disimpan"
        />,
      );
      getOrganitationsData();
    }
  }

  function isDataOrganitationExist() {
    setErrorMessage('');
    const { name_organitation, date_of_establishment, description, image } =
      organisasi;
    if (
      name_organitation == '' ||
      date_of_establishment == '' ||
      description == '' ||
      image == ''
    ) {
      setErrorMessage('Data masih belum lengkap');
      return false;
    }
    return true;
  }

  const clearInput = () => {
    setErrorMessage('');
    setOrganisasi({
      organitation_id: '',
      name_organitation: '',
      description: '',
      date_of_establishment: '',
      image: '',
    });
  };

  async function getOrganitationsData() {
    let res = await get_AllOrganitations();
    if (res.status == 401) {
      window.location.href = '/pages/login';
      return;
    }
    res = await res.json();
    setOrganisasiList(res.data);
    setLoadingOrganisasiDat(false);
  }

  function selectData(orgID) {
    const selectedOrg = organisasiList.find(
      (org) => org.organitation_id == orgID,
    );
    setOrganisasi(selectedOrg);
  }

  useEffect(() => {
    getOrganitationsData();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="min-[765px]:hidden ">
        <label className="absolute top-7 ml-5 text-2xl font-semibold  ">
          Tambah Organisasi
        </label>
      </div>
      <div className="container mx-auto w-full mt-8 p-8 sm:p-8 grid grid-cols-2 gap-x-3">
        {/* <h1 className="text-3xl font-semibold mb-4 sm:text-3xl">Input Organisasi</h1> */}
        <form className=" mr-8 grid grid-cols-1  bg w-full h-[77vh] bg-white shadow-lg rounded-md ">
          <div className="mx-auto">
            <div className="mb-4">
              <label
                htmlFor="name_organitation"
                className="block text-sm font-medium text-gray-600"
              >
                Nama Organisasi
              </label>
              <select
                id="name_organitation"
                name="name_organitation"
                value={organisasi.name_organitation}
                onChange={handleChange}
                className="mt-1 p-2 block w-[50vh] border border-gray-300 rounded-md"
              >
                <option value="">Select...</option>
                {namaOrganisasiOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="date_of_establishment"
                className="block text-sm font-medium text-gray-600"
              >
                Tanggal Berdiri
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  id="date_of_establishment"
                  name="date_of_establishment"
                  value={organisasi.date_of_establishment}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-[50vh] "
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600"
              >
                Deskripsi Organisasi
              </label>
              <textarea
                id="description"
                name="description"
                value={organisasi.description}
                onChange={handleChange}
                className="mt-1 p-2 block w-[50vh] border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-600"
              >
                Foto Organisasi
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFotoChange}
                accept="image/*"
                className="mt-1 p-2 block w-[50vh]  border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <button
                type="button"
                onClick={() =>
                  setModalContent(
                    <ModalKonfirmasi
                      actionAcc={() => saveOrganitation()}
                      actionDecline={() => setModalContent('')}
                    />,
                  )
                }
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => clearInput()}
                className="bg-slate-500 text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
              >
                Clear
              </button>
            </div>
          </div>
          {errorMessage ? (
            <h1 className="text-red-500 text-xl font-bold">{errorMessage}</h1>
          ) : (
            <></>
          )}
        </form>

        <div className="h-[75vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Data Organisasi</h2>
          <table className="w-full border-collapse border rounded-md">
            <thead>
              <tr className="bg-gray-200 ">
                <th className="p-2">Nama</th>
                <th className="p-2">Tanggal Berdiri</th>
                <th className="p-2">Deskripsi</th>
                <th className="p-2">Foto</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody
              className={loadingOrganisasiDat ? 'h-full border-2' : 'h-auto'}
            >
              {loadingOrganisasiDat ? (
                <></>
              ) : organisasiList?.length > 0 ? (
                <>
                  {organisasiList.map((org) => (
                    <tr
                      key={org.organitation_id}
                      className="border text-sm font-sans text-center hover:bg-slate-300 hover:cursor-pointer"
                      onClick={() => selectData(org.organitation_id)}
                    >
                      <td className="p-2">{org.name_organitation}</td>
                      <td className="p-2">{org.date_of_establishment}</td>
                      <td className="p-2">{org.description}</td>
                      <td className="relative p-2 ">
                        {/* yang foto ini bagusnya di admin gak muncul, soalnya makan layar */}
                        <Image
                          src={org.image.url}
                          fill={true}
                          alt={`Foto ${org.name_organitation}`}
                          className="w-full max-w-md"
                        />
                      </td>
                      <td className="p-2">
                        <button
                          onClick={(e) => {
                            setModalContent(
                              <ModalKonfirmasi
                                actionAcc={() =>
                                  handleDeleteEntry(org.organitation_id)
                                }
                                actionDecline={() => setModalContent('')}
                              />,
                            );
                          }}
                          className="text-red-500 underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className=" text-red-500 w-full text-center font-bold">
                  <td>No organitations yet</td>
                </tr>
              )}
            </tbody>
          </table>
          {loadingOrganisasiDat && (
            <div className="w-full h-full flex justify-center items-center">
              <motion.div
                className="bg-slate-900 w-2 h-2 rounded-full"
                initial={{ y: 0 }}
                animate={{ y: [0, -25, 0] }}
                transition={{ delay: 0.4, duration: 1, repeat: Infinity }}
              ></motion.div>
              <motion.div
                className="bg-slate-900 w-2 h-2 rounded-full mx-1"
                initial={{ y: 0 }}
                animate={{ y: [0, -25, 0] }}
                transition={{ delay: 0.5, duration: 1, repeat: Infinity }}
              ></motion.div>
              <motion.div
                className="bg-slate-900 w-2 h-2 rounded-full"
                initial={{ y: 0 }}
                animate={{ y: [0, -25, 0] }}
                transition={{ delay: 0.6, duration: 1, repeat: Infinity }}
              ></motion.div>
            </div>
          )}
        </div>
      </div>
      {modalContent}
    </div>
  );
};

export default InputOrganisasi;
