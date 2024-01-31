'use client';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { IoCloseCircleSharp } from 'react-icons/io5';

const Member = () => {
  const organisasiOptions = [
    'Organisasi 1',
    'Organisasi 2',
    'Organisasi 3',
    'Organisasi 4',
  ];

  const [employee, setEmployee] = useState({
    nama: '',
    posisi: '',
    organisasi: '',
    tanggal: '',
    alamat: '',
    foto: '',
  });

  const [employeeList, setEmployeeList] = useState([]);

  const handleCreate = () => {
    setEmployeeList([...employeeList, { ...employee }]);
    setEmployee({
      nama: '',
      posisi: '',
      organisasi: '',
      tanggal: '',
      alamat: '',
      foto: '',
    });
  };

  const handleUpdate = (index) => {
    const updatedList = [...employeeList];
    updatedList[index] = { ...employee };
    setEmployeeList(updatedList);
    setEmployee({
      nama: '',
      posisi: '',
      organisasi: '',
      tanggal: '',
      alamat: '',
      foto: '',
    });
  };

  const handleDelete = (index) => {
    const updatedList = [...employeeList];
    updatedList.splice(index, 1);
    setEmployeeList(updatedList);
  };

  // for mobile
  const [modalIsopen, setOpen] = useState(false);
  const [modalIsopenData, setOpenData] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const openModalData = () => {
    setOpenData(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const closeModalData = () => {
    setOpenData(false);
  };

  return (
    <>
      <div className="mx-auto mt-8 p-5 sm:p-8 max-[765px]:hidden grid grid-cols-2 w-full ">
        <form className=" w-full px-5">
          <h1 className="text-right text-xl font-semibold mb-2">
            Tambah Data Member
          </h1>
          {/* Input Nama */}
          <div className="mb-4">
            <input
              type="text"
              id="nama"
              name="nama"
              value={employee.nama}
              onChange={(e) =>
                setEmployee({ ...employee, nama: e.target.value })
              }
              placeholder="Nama Member"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Input Posisi */}
          <div className="mb-4">
            <input
              type="text"
              id="posisi"
              name="posisi"
              value={employee.posisi}
              onChange={(e) =>
                setEmployee({ ...employee, posisi: e.target.value })
              }
              placeholder="Posisi Member"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Input Organisasi */}
          <div className="mb-4">
            <label
              htmlFor="organisasi"
              className="block text-sm font-medium text-gray-600"
            >
              Organisasi
            </label>
            <select
              id="organisasi"
              name="organisasi"
              value={employee.organisasi}
              onChange={(e) =>
                setEmployee({ ...employee, organisasi: e.target.value })
              }
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select...
              </option>
              {organisasiOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Input Tanggal */}
          <div className="mb-4">
            <label className="font-sans text-red-500 text-xs">
              Tanggal Lahir Member
            </label>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              value={employee.tanggal}
              onChange={(e) =>
                setEmployee({ ...employee, tanggal: e.target.value })
              }
              placeholder="Tanggal Lahir Member"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Input Alamat */}
          <div className="mb-4">
            <input
              type="text"
              id="alamat"
              name="alamat"
              value={employee.alamat}
              onChange={(e) =>
                setEmployee({ ...employee, alamat: e.target.value })
              }
              placeholder="Alamat Member"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Input Foto */}
          <div className="mb-4">
            <input
              type="file"
              id="foto"
              name="foto"
              onChange={(e) =>
                setEmployee({ ...employee, foto: e.target.value })
              }
              placeholder="Foto Member"
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Tombol Create dan Update */}
          <div className="mb-4">
            <button
              type="button"
              onClick={handleCreate}
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => handleUpdate(employeeList.length - 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
          </div>
        </form>

        {/* Data yang ditampilkan di sebelah kanan form */}
        <div className="relative w-full border-l border-slate-500 px-5 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-2 sticky left-0">
            Data Member
          </h2>
          <table className="w-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nama</th>
                <th className="py-2 px-4 border-b">Posisi</th>
                <th className="py-2 px-4 border-b">Organisasi</th>
                <th className="py-2 px-4 border-b">Tanggal</th>
                <th className="py-2 px-4 border-b">Alamat</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-sans text-center">
              <tr className="mb-4  p-4 rounded-md border-b">
                <td
                  className="font-semibold py-2 px-4 line-clamp-2"
                  data-tooltip-target=""
                >
                  Hyeronemus abdi sang savia
                </td>
                <td className="py-2 px-4">Wakil Ketua</td>
                <td className="py-2 px-4">Mesdinar</td>
                <td className="py-2 px-4 text-xs">2050/31/31</td>
                <td className="py-2 px-4">Kalbar</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="text-red-500 underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              {employeeList.map((emp, index) => (
                <tr key={index} className="mb-4  border p-4 rounded-md">
                  <td className="text-lg font-semibold py-2 px-4">
                    {emp.nama}
                  </td>
                  <td className="py-2 px-4">{emp.posisi}</td>
                  <td className="py-2 px-4">{emp.organisasi}</td>
                  <td className="py-2 px-4 text-xs">{emp.tanggal}</td>
                  <td className="py-2 px-4">{emp.alamat}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="text-red-500 underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* for mobile */}
      <div className="min-[765px]:hidden">
        <label className="relative top-5 ml-10 text-2xl font-semibold  text-center">
          Tambah Member
        </label>

        <div className="ml-5 mt-14">
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md relative "
          >
            Isi data
          </button>

          <button
            onClick={openModalData}
            className="bg-blue-500 text-white px-4 py-2 rounded-md relative justify-end ml-5"
          >
            ShowData
          </button>
        </div>

        <Modal
          isOpen={modalIsopen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <IoCloseCircleSharp
            onClick={closeModal}
            className="h-8 w-8"
          ></IoCloseCircleSharp>
          <form className="max-w-md mr-8">
            {/* Input Nama */}
            <div className="mb-4 mt-10 ml-5">
              <input
                type="text"
                id="nama"
                name="nama"
                value={employee.nama}
                onChange={(e) =>
                  setEmployee({ ...employee, nama: e.target.value })
                }
                placeholder="Nama Member"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Input Posisi */}
            <div className="mb-4 ml-5">
              <input
                type="text"
                id="posisi"
                name="posisi"
                value={employee.posisi}
                onChange={(e) =>
                  setEmployee({ ...employee, posisi: e.target.value })
                }
                placeholder="Posisi Member"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Input Organisasi */}
            <div className="mb-4 ml-5">
              <label
                htmlFor="organisasi"
                className="block text-sm font-medium text-gray-600"
              >
                Organisasi
              </label>
              <select
                id="organisasi"
                name="organisasi"
                value={employee.organisasi}
                onChange={(e) =>
                  setEmployee({ ...employee, organisasi: e.target.value })
                }
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select...
                </option>
                {organisasiOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Input Tanggal */}
            <div className="mb-4 ml-5">
              <label className="font-sans text-red-500 text-xs">
                Tanggal Lahir Member
              </label>
              <input
                type="date"
                id="tanggal"
                name="tanggal"
                value={employee.tanggal}
                onChange={(e) =>
                  setEmployee({ ...employee, tanggal: e.target.value })
                }
                placeholder="Tanggal Lahir Member"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* Input Alamat */}
            <div className="mb-4 ml-5">
              <input
                type="text"
                id="alamat"
                name="alamat"
                value={employee.alamat}
                onChange={(e) =>
                  setEmployee({ ...employee, alamat: e.target.value })
                }
                placeholder="Alamat Member"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* Input Foto */}
            <div className="mb-4 ml-5">
              <input
                type="file"
                id="foto"
                name="foto"
                onChange={(e) =>
                  setEmployee({ ...employee, foto: e.target.value })
                }
                placeholder="Foto Member"
                accept="image/*"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* Tombol Create dan Update */}
            <div className="mb-4 ml-5">
              <button
                type="button"
                onClick={handleCreate}
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => handleUpdate(employeeList.length - 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={modalIsopenData}
          onRequestClose={closeModalData}
          contentLabel="Example Modal"
        >
          <IoCloseCircleSharp
            onClick={closeModalData}
            className="h-8 w-8"
          ></IoCloseCircleSharp>

          {/* Data yang ditampilkan di sebelah kanan form */}
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-2">Data Member</h2>
            <table className="w-full">
              <thead className="w-full">
                <tr>
                  <th className="py-2 px-4 border-b">Nama</th>
                  <th className="py-2 px-4 border-b">Posisi</th>
                  <th className="py-2 px-4 border-b">Organisasi</th>
                  <th className="py-2 px-4 border-b">Tanggal</th>
                  <th className="py-2 px-4 border-b">Alamat</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm font-sans">
                {employeeList.map((emp, index) => (
                  <tr key={index} className="mb-4  border p-4 rounded-md">
                    <td className="text-lg font-semibold py-2 px-4">
                      {emp.nama}
                    </td>
                    <td className="py-2 px-4">{emp.posisi}</td>
                    <td className="py-2 px-4">{emp.organisasi}</td>
                    <td className="py-2 px-4 text-xs">{emp.tanggal}</td>
                    <td className="py-2 px-4">{emp.alamat}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => setEmployee({ ...emp })}
                        className="text-green-500 underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(index)}
                        className="text-red-500 underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Member;
