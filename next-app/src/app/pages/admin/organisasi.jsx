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

  const handleUpdateEntry = (index) => {
    // Mengambil data organisasi pada index tertentu dari organisasiList
    const updatedOrganisasi = organisasiList[index];

    // Mengisi formulir dengan data yang diambil
    setOrganisasi({ ...updatedOrganisasi });

    // Menyimpan index untuk digunakan dalam handleUpdate
  };

  const handleUpdate = async (organisasiID) => {
    try {
      if (organisasiID !== null) {
        const formData = convertToFormData();
        console.log(formData.get('image'));
        const res = await put_Organitation(organisasiID, formData);
        if (res.error) {
          setModalContent(
            <Modal
              type="danger"
              action={() => {
                setModalContent('');
                clearInput();
              }}
            >
              <div className="">
                <div className="flex justify-center items-center w-full h-24 text-red-500 animate-pulse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="full"
                  >
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                  </svg>
                </div>
                <h1 className="text-red-500">{res.error}</h1>
                <h1 className="text-slate-500 text-center ">
                  klik ok untuk melanjutkan
                </h1>
              </div>
              ,
            </Modal>,
          );
          return;
        }
        setModalContent(
          <Modal
            type="success"
            action={() => {
              setModalContent('');
              clearInput();
            }}
          >
            <div className="">
              <div className="flex justify-center items-center w-full h-24 text-green-500 animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  height="full"
                  fill="currentColor"
                >
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
                </svg>
              </div>
              <h1 className="text-green-500 text-center">
                Data berhasil diupdate
              </h1>
              <h1 className="text-slate-500 text-center ">
                klik ok untuk melanjutkan
              </h1>
            </div>
            ,
          </Modal>,
        );

        // Menyimpan perubahan ke dalam state organisasiList
        clearInput();
        getOrganitationsData();

        // Reset updatedIndex
      } else {
        // Handle jika updatedIndex tidak valid
        console.error('Invalid updated Index');
      }
    } catch (e) {
      console.log('error when updating with message : ', e.message);
    }
  };

  const handleDeleteEntry = async (index) => {
    //mengkosongkan isi modal
    setModalContent('');
    //mengubah loading statement
    setLoadingOrganisasiDat(true);

    //Melakukan request delete ke backend
    const res = await delete_Organitation(index);

    // Kondisi apabila terjadi error
    if (res?.error) {
      setModalContent(
        <Modal
          type="danger"
          action={() => {
            setModalContent('');
            clearInput();
          }}
        >
          <div className="">
            <div className="flex justify-center items-center w-full h-24 text-red-500 animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                height="full"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
              </svg>
            </div>
            <h1 className="text-red-500">{res.error}</h1>
            <h1 className="text-slate-500 text-center ">
              klik ok untuk melanjutkan
            </h1>
          </div>
          ,
        </Modal>,
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
      >
        <div className="">
          <div className="flex justify-center items-center w-full h-24 text-green-500 animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="full"
              fill="currentColor"
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
            </svg>
          </div>
          <h1 className="text-green-500 text-center">Delete Success</h1>
          <h1 className="text-slate-500 text-center ">
            klik ok untuk melanjutkan
          </h1>
        </div>
        ,
      </Modal>,
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
    setOrganisasi({ ...organisasi, [e.target.name]: file });
    // Lakukan sesuatu dengan file foto (misalnya, menyimpan ke state atau mengunggah ke server)
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

  async function simpanOrganisasi(dataOrganisasi) {
    // melakukan koneksi ke backend
    const res = await post_Organitation(dataOrganisasi);
    // menampilkan modal berdasarkan kondisi koneksi
    console.log(res);
    if (res?.error) {
      setModalContent(
        <Modal
          type="danger"
          action={() => {
            setModalContent('');
            clearInput();
          }}
        >
          <div className="">
            <div className="flex justify-center items-center w-full h-24 text-red-500 animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                height="full"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
              </svg>
            </div>
            <h1 className="text-red-500">{res.error}</h1>
            <h1 className="text-slate-500 text-center ">
              Harap cek kembali data yang akan dimasukkan
            </h1>
          </div>
          ,
        </Modal>,
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
      >
        <div className="">
          <div className="flex justify-center items-center w-full h-24 text-green-500 animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="full"
              fill="currentColor"
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
            </svg>
          </div>
          <h1 className="text-green-500 text-center">
            Data berhasil ditambahkan
          </h1>
          <h1 className="text-slate-500 text-center ">
            klik ok untuk melanjutkan
          </h1>
        </div>
        ,
      </Modal>,
    );
    // getOrganitationsData();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalContent('');
    // mengecek apakah data yang dimasukkan sudah lengkap
    console.log(organisasi);
    if (organisasi.name_organitation == '')
      return setErrorMessage('Harap masukkan nama organisasi!');
    if (organisasi.date_of_establishment == '')
      return setErrorMessage('Tanggal masih kosong!');
    if (organisasi.description == '')
      return setErrorMessage(
        'Deskripsi masih kosong harap masukkan deskripsi!',
      );
    if (organisasi.image == '') return setErrorMessage('Foto masih kosong');

    const formData = convertToFormData();

    // memanggil fungsi simpanOrganisasi
    simpanOrganisasi(formData);
    // Logika untuk mengirim data organisasi ke server atau melakukan tindakan lainnya
    console.log('Data Organisasi:', organisasi);
  };

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
    const res = await get_AllOrganitations();
    if (res?.error == 'Unauthorized') {
      window.location.href = '/pages/login';
      return;
    }
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
    console.log('loadingState : ', loadingOrganisasiDat);
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
                  onChange={(e) => {
                    // const [tahun, bulan, hari] = e.target.value.split('-');
                    setOrganisasi({
                      ...organisasi,
                      [e.target.name]: e.target.value,
                    });
                  }}
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
                onClick={() => handleSubmit()}
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => handleUpdate(organisasi.organitation_id)}
                className="bg-secondary text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
              >
                Update
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
                          onClick={() =>
                            handleDeleteEntry(organisasi.organitation_id)
                          }
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
