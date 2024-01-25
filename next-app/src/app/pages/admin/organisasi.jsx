// components/InputOrganisasi.js
import React, { useState, useEffect } from 'react';
import {
  get_AllOrganitations,
  put_Organitation,
  delete_Organitation,
  post_Organitation,
} from '@/app/api/Admin/organitations/route';
import Modal from '@/components/Fragments/Modal';

const InputOrganisasi = () => {
  const [organisasi, setOrganisasi] = useState({
    name_organitation: '',
    description: '',
    date_of_establishment: '',
    image: '',
  });

  const [organisasiList, setOrganisasiList] = useState();
  const [loadingOrganisasiDat, setLoadingOrganisasiDat] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalContent, setModalContent] = useState('');

  const inputNama = document.querySelector('#name_organitation');
  const inputTanggal = document.querySelector('#date_of_establishment');
  const inputDesc = document.querySelector('#description');
  const inputFoto = document.querySelector('#image');

  const namaOrganisasiOptions = [
    'OMK',
    'Misdinas',
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

  const handleUpdate = async (index) => {
    if (index !== null) {
      // Mengambil salinan dari organisasiList
      const updatedList = [...organisasiList];

      // melakukan destruksi sebuah objek pada index yang akan diubah
      var { name_organitation, date_of_establishment, description, image } =
        updatedList[index];

      // mengecek apakah ada data yang dikosongi jika ada gunakan data yang lama
      if (inputNama.value != '') name_organitation = inputNama.value;
      if (inputTanggal.value != '') date_of_establishment = inputTanggal.value;

      if (inputDesc.value != '') description = inputDesc.value;
      if (inputFoto.value != '') image = inputFoto.files[0];

      const res = await put_Organitation(index, organisasi);
      if (res.error) {
        setErrorMessage(res.error);
      }

      // Menyimpan perubahan ke dalam state organisasiList
      setOrganisasiList(updatedList);
      clearInput();
      getOrganitationsData();

      // Reset updatedIndex
    } else {
      // Handle jika updatedIndex tidak valid
      console.error('Invalid updatedIndex');
    }
  };

  const handleDeleteEntry = (index) => {
    // Logika untuk menghapus data organisasi pada index tertentu
    setModalContent('');
    setLoadingOrganisasiDat(true);
    async function deleteData(index) {
      const res = await delete_Organitation(index);
      if (res?.error) {
        setOrganisasiList();
        setLoadingOrganisasiDat(false);
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
      setLoadingOrganisasiDat(false);
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
    }

    deleteData(index);
    getOrganitationsData();
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

  const convertToFormData = () => {
    var formData = new FormData();
    formData.append('name_organitation', organisasi.name_organitation);
    formData.append('date_establishment', organisasi.date_of_establishment);
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

    // memanggil fungsi simpanOrganisasi
    simpanOrganisasi(convertToFormData());
    // Logika untuk mengirim data organisasi ke server atau melakukan tindakan lainnya
    console.log('Data Organisasi:', organisasi);
  };

  const clearInput = () => {
    inputNama.value = '';
    inputTanggal.value = '';
    inputDesc.value = '';
    inputFoto.value = '';

    setOrganisasi({
      name_organitation: '',
      description: '',
      date_of_establishment: '',
      image: '',
    });
  };

  async function getOrganitationsData() {
    const res = await get_AllOrganitations();
    setOrganisasiList(res.data);
    setLoadingOrganisasiDat(false);
  }

  useEffect(() => {
    getOrganitationsData();
  }, []);

  return (
    <>
      <div className="container mx-auto mt-8 p-8 sm:p-8 flex">
        {/* <h1 className="text-3xl font-semibold mb-4 sm:text-3xl">Input Organisasi</h1> */}
        <form
          onSubmit={handleSubmit}
          className="max-w-md mr-8 grid grid-cols-1  bg w-[65vh] bg-white shadow-lg rounded-md "
        >
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
                value={organisasi.nama}
                onChange={handleChange}
                className="mt-1 p-2 block w-[50vh] border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select...
                </option>
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
                  // value={`${organisasi.tahun}-${organisasi.bulan}-${organisasi.hari}`}
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
                value={organisasi.deskripsi}
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
                type="submit"
                className="bg-secondary text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
              >
                Submit
              </button>
              <button
                onClick={() => handleUpdateEntry(index)}
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
              >
                Update
              </button>
            </div>
          </div>
          {errorMessage ? (
            <h1 className="text-red-500 text-xl font-bold">{errorMessage}</h1>
          ) : (
            <></>
          )}
        </form>

        <div className="h-screen overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Data Organisasi</h2>
          <table className=" w-full border-collapse border rounded-md">
            <thead>
              <tr className="bg-gray-200 ">
                <th className="p-2">Nama</th>
                <th className="p-2">Tanggal Berdiri</th>
                <th className="p-2">Deskripsi</th>
                <th className="p-2">Foto</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loadingOrganisasiDat ? (
                <>
                  <tr className="w-80 h-14 bg-slate-500 animate-pulse"></tr>
                  <tr className="w-80 h-14 bg-slate-500 animate-pulse"></tr>
                  <tr className="w-80 h-14 bg-slate-500 animate-pulse"></tr>
                  <tr className="w-80 h-14 bg-slate-500 animate-pulse"></tr>
                  <tr className="w-80 h-14 bg-slate-500 animate-pulse"></tr>
                  <tr className="w-80 h-14 bg-slate-500 animate-pulse"></tr>
                  <tr className="w-80 h-14 bg-slate-500 animate-pulse"></tr>
                  <tr className="w-80 h-14 bg-slate-500 animate-pulse"></tr>
                  <tr className="w-80 h-14 bg-slate-500 animate-pulse"></tr>
                  <tr className="w-80 h-14 bg-slate-500 animate-pulse"></tr>
                </>
              ) : organisasiList == [] ? (
                <>
                  <tr>
                    {organisasiList ? <h1>true</h1> : <h1>false</h1>}
                    {loadingOrganisasiDat ? <h1>true</h1> : <h1>false</h1>}
                  </tr>
                  {organisasiList.map((org, index) => (
                    <tr
                      key={index}
                      className="border text-sm font-sans text-center hover:bg-slate-300 hover:cursor-pointer"
                      onClick={(e) => console.log(e.target)}
                    >
                      <td className="p-2">{org.nama}</td>
                      <td className="p-2">{`${org.tahun}-${org.bulan}-${org.hari}`}</td>
                      <td className="p-2">{org.deskripsi}</td>
                      <td className="p-2">
                        {/* yang foto ini bagusnya di admin gak muncul, soalnya makan layar */}
                        <img
                          src={org.foto}
                          alt={`Foto ${org.nama}`}
                          className="w-full max-w-md"
                        />
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => handleUpdate(index)}
                          className="text-green-500 underline mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteEntry(index)}
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
      </div>
      {modalContent}
    </>
  );
};

export default InputOrganisasi;
