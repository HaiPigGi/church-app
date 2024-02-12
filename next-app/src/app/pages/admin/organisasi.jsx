// components/InputOrganisasi.js
import React, { useState, useEffect } from 'react';
import {
  get_AllOrganitations,
  delete_Organitation,
  post_Organitation,
} from '@/app/api/Admin/organitations/route';
import Image from 'next/image';
import useOrganisasi from '@/lib/customHooks/useOrganisasi';
import useModalContent from '@/lib/customHooks/useModalContent';
import { isResponseError } from './posisi';
import 'remixicon/fonts/remixicon.css';

const InputOrganisasi = () => {
  const {
    organisasi,
    organisasiList,
    setOrganisasi,
    setOrganisasiList,
    clearOrganisasi,
  } = useOrganisasi();
  const [loadingOrganisasiDat, setLoadingOrganisasiDat] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { modalContent, clearState, setModalContent } = useModalContent();
  const [showOrganisasi, setShowOrganisasi] = useState(false);

  const namaOrganisasiOptions = [
    'OMK',
    'Misdinar',
    'Pastoran',
    'DPP',
    'Panitia Paskah',
    'Panitia Natal',
  ];

  const handleDeleteEntry = async (id) => {
    //mengubah loading statement
    setLoadingOrganisasiDat(true);

    //Melakukan request delete ke backend
    let res = await delete_Organitation(id);
    // Kondisi apabila terjadi error
    if (isResponseError(res, setModalContent, clearState)) return;
    res = await res.json();
    setOrganisasiList(res.data);
    setModalContent('validation', {
      typeMessage: 'success',
      message: 'Data berhasil dihapus',
      action: clearState,
    });
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
      let res = await post_Organitation(formData);

      // menampilkan modal berdasarkan kondisi koneksi
      if (isResponseError(res, setModalContent, clearState)) return;
      setModalContent('validation', {
        typeMessage: 'success',
        message: 'Data berhasil disimpan',
        action: clearState,
      });
      getOrganitationsData();
    }
    return;
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
    clearOrganisasi();
  };

  async function getOrganitationsData() {
    let res = await get_AllOrganitations();
    if (isResponseError(res, setModalContent, clearState)) return;
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

  const handleShowOrganisasi = () => {
    setShowOrganisasi(!showOrganisasi);
  };

  useEffect(() => {
    clearState();
    getOrganitationsData();
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden border-2">
      <div className="container mx-auto w-full mt-8 md:p-8 p-3 md:grid md:grid-cols-2 md:gap-x-3">
        {/* <h1 className="text-3xl font-semibold mb-4 sm:text-3xl">Input Organisasi</h1> */}
        <form className=" mr-8 grid grid-cols-1 w-full h-screen md:h-[77vh] bg-white shadow-lg rounded-md p-5 flex justify-center items-start">
          <div className="mx-auto">
            <div className="min-[765px]:hidden ">
              <label className="text-xl font-semibold  text-center">
                Tambah Organisasi
              </label>
            </div>
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
                className="mt-1 p-2 block max-w-[50vh] w-full border border-gray-300 rounded-md"
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
                  className="p-2 border border-gray-300 rounded-md w-full max-w-[50vh] "
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
                className="mt-1 p-2 block w-full max-w-[50vh] border border-gray-300 rounded-md"
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
                className="mt-1 p-2 block max-w-[50vh] w-full  border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <button
                type="button"
                onClick={() =>
                  setModalContent('confirmation', {
                    actionAcc: saveOrganitation,
                    actionDecline: clearState,
                  })
                }
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
              >
                Tambah
              </button>
              <button
                type="button"
                onClick={() => clearInput()}
                className="bg-slate-500 text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
              >
                Bersihkan
              </button>
              <button
                type="button"
                onClick={() =>
                  setModalContent('show', {
                    content: (
                      <AllOrganitations
                        data={{
                          loadingOrganisasiDat,
                          organisasiList,
                          setModalContent,
                          clearState,
                          selectData,
                          handleDeleteEntry,
                        }}
                      />
                    ),
                  })
                }
                className="bg-blue-500 text-white px-2 pb-1 pt-2 rounded-md mr-2 sm:mr-2 sm:mb-0 md:hidden absolute right-4 bottom-10"
              >
                <i class="ri-list-view ri-xl"></i>
              </button>
            </div>
            {errorMessage ? (
              <h1 className="text-red-500 text-xl font-bold">{errorMessage}</h1>
            ) : (
              <></>
            )}
          </div>
        </form>
        <div className="hidden md:block">
          <AllOrganitations
            data={{
              loadingOrganisasiDat,
              organisasiList,
              setModalContent,
              clearState,
              selectData,
              handleDeleteEntry,
            }}
          />
        </div>
      </div>
      {modalContent}
    </div>
  );
};

const AllOrganitations = (props) => {
  const {
    loadingOrganisasiDat,
    organisasiList,
    setModalContent,
    clearState,
    selectData,
    handleDeleteEntry,
  } = props.data;
  return (
    <div className="relative h-[75vh] overflow-y-auto ">
      <h2 className="text-xl font-semibold mb-2">Data Organisasi</h2>
      <button className="absolute top-0 right-5" onClick={clearState}>
        <i class="ri-close-circle-fill text-black ri-lg"></i>{' '}
      </button>
      <table className="w-full border-collapse border rounded-md">
        <thead>
          <tr className="bg-gray-200 ">
            <th className="px-2">Nama</th>
            <th className="px-2">Tanggal Berdiri</th>
            <th className="px-2">Deskripsi</th>
            <th className="px-2">Foto</th>
            <th className="px-2">Aksi</th>
          </tr>
        </thead>
        <tbody className={loadingOrganisasiDat ? 'h-full border-2' : 'h-auto'}>
          {organisasiList?.length > 0 ? (
            <>
              {organisasiList.map((org) => (
                <tr
                  key={org.organitation_id}
                  className="border text-sm font-sans text-center hover:bg-slate-300 hover:cursor-pointer"
                  onClick={() => selectData(org.organitation_id)}
                >
                  <td className="px-2">{org.name_organitation}</td>
                  <td className="px-2">{org.date_of_establishment}</td>
                  <td className="px-2 line-clamp-2 ">{org.description}</td>
                  <td className="relative px-2 ">
                    {/* yang foto ini bagusnya di admin gak muncul, soalnya makan layar */}
                    <Image
                      src={org.image.url}
                      fill={true}
                      alt={`Foto ${org.name_organitation}`}
                      className="w-full max-w-md object-cover"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => {
                        setModalContent('confirmation', {
                          actionAcc: () =>
                            handleDeleteEntry(org.organitation_id),
                          actionDecline: clearState,
                        });
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
    </div>
  );
};

export default InputOrganisasi;
