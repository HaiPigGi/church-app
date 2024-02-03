'use client';
import React, { useEffect, useState } from 'react';
import Modal from '@/components/Fragments/Modal';
import { IoCloseCircleSharp } from 'react-icons/io5';
import {
  deleteMemberData,
  getMembersData,
  postMembersData,
} from '@/app/api/Admin/members/routes';
import { motion } from 'framer-motion';
import ReactModal from 'react-modal';
import { get_AllOrganitations } from '@/app/api/Admin/organitations/route';
import { get_Position } from '@/app/api/Admin/position/route';
import { getUserData } from '@/lib/features/session/sessionSlice';
import { useAppSelector } from '@/lib/hook';
import { useDispatch } from 'react-redux';
import LoadingBounce from '@/components/Fragments/Loading/LoadingBounce';
import ModalKonfirmasi from '@/components/Fragments/Modal/ModalKonfirmasi';

const Member = () => {
  const [employee, setEmployee] = useState({
    member_id: '',
    members_name: '',
    position_name: '',
    organitation_name: '',
    born_date: '',
    address: '',
    image: '',
  });

  const [employeeList, setEmployeeList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [organitationList, setOrganitationList] = useState([]);
  const [loadingState, setLoadingState] = useState();
  const [modalContent, setModalContent] = useState();

  const handleCreate = async () => {
    const { organitation_name, position_name } = employee;
    console.log(employee);
    setLoadingState('loading');
    if (isPositionAvailable(organitation_name, position_name)) {
      const data = convertToFormData();
      const res = await postMembersData(data);
      if (isResponseError(res)) return;
      typeModal('Data berhasil ditambahkan', 'success');
      clearData();
      getAllMembers();
      return;
    }
  };

  const clearData = () => {
    setEmployee({
      member_id: '',
      members_name: '',
      position_name: '',
      organitation_name: '',
      born_date: '',
      address: '',
      image: '',
    });
  };

  const handleUpdate = (index) => {
    const updatedList = [...employeeList];
    updatedList[index] = { ...employee };
    setEmployeeList(updatedList);
    clearData();
  };

  const handleDelete = async (id) => {
    setLoadingState('loading');
    const res = await deleteMemberData(id);
    if (isResponseError(res)) return;
    getAllMembers();
    typeModal('data berhasil dihapus', 'success');
    return;
  };

  const redirectToHomePage = (location) => {
    return (window.location.href = location);
  };

  // to determine what's the message failed or success
  const typeModal = (Message, state, redirect) => {
    setModalContent(
      <Modal
        type={state}
        action={() => {
          clearData();
          redirect && redirectToHomePage(redirect);
          setModalContent('');
        }}
        message={Message}
      />,
    );
  };

  // to get all data members in database from api
  const getAllMembers = async () => {
    // calling getMembersData for accessing the api
    let res = await getMembersData();
    // if error
    if (isResponseError(res)) return;
    // if success
    res = await res.json();
    setEmployeeList(res.data);
    getAllOrganitations();
    getAllPosition();
    return;
  };

  const isResponseError = (res) => {
    if (!res) {
      typeModal('Terjadi kesalahan di server', 'failed');
      setLoadingState('failed');
      return true;
    }
    if (res.status == 200 || res.status == 201) {
      setModalContent('');
      setLoadingState('success');
      return false;
    }
    if (res.status == 401) {
      typeModal(
        'Sesi sudah berakhir harap login kembali',
        'failed',
        '/pages/login',
      );
      setLoadingState('failed');
      return true;
    }
    setLoadingState('failed');
    typeModal('Terjadi kesalahan saat melakukan pengambilan data', 'failed');
    return true;
  };

  const getAllOrganitations = async () => {
    let res = await get_AllOrganitations();
    if (isResponseError(res)) return;
    res = await res.json();
    setOrganitationList(res.data);
    return;
  };

  const getAllPosition = async () => {
    let res = await get_Position();
    if (isResponseError(res)) return;
    res = await res.json();
    setPositionList(res.positions);
  };

  const searchOrganitationBasedId = (name) => {
    return organitationList.find((data) => data.name_organitation == name);
  };

  const searchPositionBasedId = (name) => {
    return positionList.find((data) => data.position_name == name);
  };

  const convertToFormData = () => {
    if (
      employee.members_name == '' ||
      employee.born_date == '' ||
      employee.address == '' ||
      employee.image == ''
    ) {
      typeModal('Data Masih Kosong', 'failed');
      return;
    }
    const idPosition = searchPositionBasedId(employee.position_name);
    const idOrg = searchOrganitationBasedId(employee.organitation_name);
    console.log(idOrg);
    const formData = new FormData();
    formData.append('members_name', employee.members_name);
    formData.append('position_id', idPosition.position_id);
    formData.append('organitation_id', idOrg.organitation_id);
    formData.append('born_date', employee.born_date);
    formData.append('address', employee.address);
    formData.append('image', employee.image);
    return formData;
  };

  const fixFormatDate = (year, month, date) => {
    var fixedFormat;
    if (String(date).length < 2) {
      date = `0${date}`;
    }
    if (String(month).length < 2) {
      month = `0${month}`;
    }
    fixedFormat = `${year}-${month}-${date}`;
    return fixedFormat;
  };

  const calculateMinimalAge = (date) => {
    return date.getDate() - 360 * 14;
  };

  const setMinimalYearsOld = () => {
    const dateNow = new Date();
    const date = calculateMinimalAge(dateNow);
    dateNow.setDate(date);
    return fixFormatDate(
      dateNow.getFullYear(),
      dateNow.getMonth(),
      dateNow.getDate(),
    );
  };

  const isPositionAvailable = (organitation, position) => {
    // to save posititon name that only have 1 member
    const allPosition = ['ketua', 'wakil'];
    const dataSamePosition = findEmployees(organitation, position);

    if (!dataSamePosition) return true;
    // check if position in new member is not include in allPosition
    if (!allPosition.includes(position) || dataSamePosition.length < 2) {
      return true;
    }
    typeModal('error', `${position} tidak boleh memiliki lebih dari 1 anggota`);
    return false;
  };

  const findEmployees = (organitation, position, id) => {
    if (organitation && position) {
      return employeeList.find(
        (data) =>
          (data.organitation_name == organitation) &
          (data.position_name == position),
      );
    }
    if (id) {
      return employeeList.find((data) => data.members_id == id);
    }
  };

  useEffect(() => {
    // set the loading statement
    async function getAllData() {
      setLoadingState('loading');
      getAllMembers();
    }
    getAllData();
    // calling function getAllMembers
  }, []);

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

  // for mobile
  const [modalIsopen, setOpen] = useState(false);
  const [modalIsopenData, setOpenData] = useState(false);

  return (
    <>
      <div className="mx-auto p-5 sm:p-8 max-[765px]:hidden grid grid-cols-2 w-full overflow-hidden">
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
              value={employee.members_name}
              onChange={(e) =>
                setEmployee({ ...employee, members_name: e.target.value })
              }
              placeholder="Nama Member"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Input Posisi */}
          <div className="mb-4">
            <label
              htmlFor="posisi"
              className="block text-sm font-medium text-gray-600"
            >
              Posisi
            </label>
            <select
              id="posisi"
              name="posisi"
              value={employee.position_name}
              onChange={(e) => {
                setEmployee({
                  ...employee,
                  position_name: e.target.value,
                });
                console.log(employee);
              }}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select...
              </option>
              {positionList.map((ps) => (
                <option key={ps.position_id} value={ps.position_name}>
                  {ps.position_name}
                </option>
              ))}
            </select>
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
              value={employee.organitation_name}
              onChange={(e) =>
                setEmployee({ ...employee, organitation_name: e.target.value })
              }
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select...
              </option>
              {organitationList.map((org) => (
                <option key={org.organitation_id} value={org.name_organitation}>
                  {org.name_organitation}
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
              value={employee.born_date}
              max={setMinimalYearsOld()}
              onChange={(e) => {
                setEmployee({ ...employee, born_date: e.target.value });
              }}
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
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
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
                setEmployee({ ...employee, image: e.target.files[0] })
              }
              placeholder="Foto Member"
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          {(organitationList.length == 0) & (positionList.length == 0) ? (
            <h1 className="text-red-500 text-md font-bold">
              data organisasi atau posisi masih belum ada harap tambahkan
              terlebih dahulu
            </h1>
          ) : (
            <></>
          )}

          {/* Tombol Create dan Update */}
          <div className="mb-4">
            {(organitationList == 0) & (positionList.length == 0) ? (
              <>
                <button
                  className="bg-slate-500 text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
                  disabled
                >
                  Create
                </button>
                <button
                  className="bg-slate-500 text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
                  disabled
                >
                  Clear
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setModalContent(
                      <ModalKonfirmasi
                        actionAcc={handleCreate}
                        actionDecline={setModalContent('')}
                      />,
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => clearData()}
                  className="border border-slate-500 text-slate-500 px-4 py-2 rounded-md"
                >
                  clear
                </button>
              </>
            )}
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
              {employeeList.map((emp) => (
                <tr
                  key={emp.members_id}
                  className="mb-4  p-4 rounded-md border-b cursor-pointer hover:bg-slate-100"
                  onClick={() => setEmployee(emp)}
                >
                  <td className="font-semibold py-2 px-4 line-clamp-2">
                    {emp.members_name}
                  </td>
                  <td className="py-2 px-4">{emp.position_name}</td>
                  <td className="py-2 px-4">{emp.organitation_name}</td>
                  <td className="py-2 px-4 text-xs">{emp.born_date}</td>
                  <td className="py-2 px-4 line-clamp-2">{emp.address}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        setModalContent(
                          <ModalKonfirmasi
                            actionAcc={() => handleDelete(emp.members_id)}
                            actionDecline={() => setModalContent('')}
                          />,
                        )
                      }
                      className="text-red-500 underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loadingState == 'loading' && <LoadingBounce />}
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

        <ReactModal
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
                {organitationList.map((org) => (
                  <option key={org.organitation_id} value={org.organitation_id}>
                    {org.organitation_name}
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
            {(organitationList.length == 0) & (positionList.length == 0) ? (
              <h1 className="text-red-500 text-xl font-bold">
                data organisasi atau posisi masih belum ada harap tambahkan
                terlebih dahulu
              </h1>
            ) : (
              <></>
            )}

            {/* Tombol Create dan Update */}
            <div className="mb-4">
              {(organitationList.length == 0) & (positionList.length == 0) ? (
                <button
                  className="bg-slate-500 text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
                  disabled
                >
                  Create
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCreate}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 sm:mr-2 sm:mb-0"
                  >
                    Create
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleUpdate(employeeList.length - 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            </div>
          </form>
        </ReactModal>

        <ReactModal
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
        </ReactModal>
      </div>
      <div className="w-full h-screen overflow-hidden">{modalContent}</div>
    </>
  );
};

export default Member;
