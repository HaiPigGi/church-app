// components/InputOrganisasi.js
import React, { useState } from 'react';

const InputOrganisasi = () => {
  const [organisasi, setOrganisasi] = useState({
    nama: '',
    tahun: '',
    bulan: '',
    hari: '',
    deskripsi: '',
    foto: '',
  });
  const [organisasiList, setOrganisasiList] = useState([]);

  const namaOrganisasiOptions = ['OMK', 'Misdinas', 'Pastoran', 'DPP' ,'Panita Paska','Panitia Natal'];

  const handleUpdateEntry = (index) => {
    // Mengambil data organisasi pada index tertentu dari organisasiList
    const updatedOrganisasi = organisasiList[index];
  
    // Mengisi formulir dengan data yang diambil
    setOrganisasi({ ...updatedOrganisasi });
  
    // Menyimpan index untuk digunakan dalam handleUpdate
    setUpdatedIndex(index);
  };
  
  const [updatedIndex, setUpdatedIndex] = useState(null);

const handleUpdate = () => {
  if (updatedIndex !== null) {
    // Mengambil salinan dari organisasiList
    const updatedList = [...organisasiList];
  
    // Mengganti data organisasi pada index tertentu dengan data yang baru
    updatedList[updatedIndex] = { ...organisasi };

    // Menyimpan perubahan ke dalam state organisasiList
    setOrganisasiList(updatedList);

    // Menyusun formulir dengan nilai kosong setelah perubahan
    setOrganisasi({
      nama: '',
      tahun: '',
      bulan: '',
      hari: '',
      deskripsi: '',
      foto: '',
    });

    // Reset updatedIndex
    setUpdatedIndex(null);
  } else {
    // Handle jika updatedIndex tidak valid
    console.error('Invalid updatedIndex');
  }
};


  const handleDeleteEntry = (index) => {
    // Logika untuk menghapus data organisasi pada index tertentu
    const updatedList = [...organisasiList];
    updatedList.splice(index, 1);
    setOrganisasiList(updatedList);
    console.log('Data Organisasi Dihapus:', organisasiList[index]);
  };

  const handleChange = (e) => {
    setOrganisasi({ ...organisasi, [e.target.name]: e.target.value });
  };

  const handleFotoChange = (e) => {
    // Logika untuk mengelola file foto
    const file = e.target.files[0];
    // Lakukan sesuatu dengan file foto (misalnya, menyimpan ke state atau mengunggah ke server)
    console.log('File Foto:', file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika untuk mengirim data organisasi ke server atau melakukan tindakan lainnya
    console.log('Data Organisasi:', organisasi);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    // Menambahkan data organisasi baru ke dalam list
    setOrganisasiList([...organisasiList, organisasi]);
    // Membersihkan form setelah data ditambahkan
    setOrganisasi({
      nama: '',
      tahun: '',
      bulan: '',
      hari: '',
      deskripsi: '',
      foto: '',
    });
  };



  return (
    <div className="container mx-auto mt-8 p-8 sm:p-8 flex">
      {/* <h1 className="text-3xl font-semibold mb-4 sm:text-3xl">Input Organisasi</h1> */}
      <form onSubmit={handleSubmit} className="max-w-md mr-8 grid grid-cols-1  bg w-[65vh] bg-white shadow-lg rounded-md ">
        <div className='mx-auto'>
        <div className="mb-4">
          <label htmlFor="namaOrganisasi" className="block text-sm font-medium text-gray-600">
            Nama Organisasi
          </label>
          <select
            id="namaOrganisasi"
            name="nama"
            value={organisasi.nama}
            onChange={handleChange}
            className="mt-1 p-2 block w-[50vh] border border-gray-300 rounded-md"
          >
            <option value="" disabled>Select...</option>
            {namaOrganisasiOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="tahun" className="block text-sm font-medium text-gray-600">
            Tanggal Berdiri
          </label>
          <div className="flex space-x-2">
            <input
                type="date"
                id="tanggal"
                name="tanggal"
                value={`${organisasi.tahun}-${organisasi.bulan}-${organisasi.hari}`}
                onChange={(e) => {
                const [tahun, bulan, hari] = e.target.value.split('-');
                setOrganisasi({ ...organisasi, tahun, bulan, hari });
                }}
                className="p-2 border border-gray-300 rounded-md w-[50vh] "
            />
            </div>
        </div>

        <div className="mb-4">
          <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-600">
            Deskripsi Organisasi
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={organisasi.deskripsi}
            onChange={handleChange}
            className="mt-1 p-2 block w-[50vh] border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="foto" className="block text-sm font-medium text-gray-600">
            Foto Organisasi
          </label>
          <input
            type="file"
            id="foto"
            name="foto"
            onChange={handleFotoChange}
            accept="image/*"
            className="mt-1 p-2 block w-[50vh]  border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <button
            onClick={handleCreate}
            className="bg-secondary text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0" >
            Submit
          </button>
          <button onClick={() => handleUpdateEntry(index)} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0">
            Update
          </button>
        </div>
        </div>
      </form>

      <div className=''>
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
          <tbody>
            {organisasiList.map((org, index) => (
              <tr key={index} className="border text-sm font-sans text-center">
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
                  <button onClick={() => handleUpdate(index)} className="text-green-500 underline mr-2">
                    Update
                  </button>
                  <button onClick={() => handleDeleteEntry(index)} className="text-red-500 underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InputOrganisasi;
