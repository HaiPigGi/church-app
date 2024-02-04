import React, { useState, useEffect, useRef } from 'react';
import {
  post_position,
  get_Position,
  update_position,
  delete_position,
} from '@/app/api/Admin/position/route';
import Modal from '@/components/Fragments/Modal';
import usePosition from '../../../lib/customHooks/Position/usePosition';
import useModalContent from '@/lib/customHooks/ModalContent/useModalContent';

// function for handle action to positionList

// function for handle action to modalContent
const searchPosition = (positionID, position_list) => {
  return position_list.find((data) => data.position_id == positionID);
};

// function for create new position
const handleCreate = async (
  clearPosition,
  setModalContent,
  clearState,
  position_name,
  setPositionList,
) => {
  const res = await post_position(convertToFormData(position_name));
  // check if the response is error
  if (isResponseError(res, setModalContent, clearState)) return;
  fetchData(setPositionList, setModalContent);
  clearPosition();
};

const isResponseError = (res, setModalContent, clearState) => {
  // if res is undefined or null
  if (!res) return true;
  // if res status is success
  if (res.status == 200 || res.status == 201) {
    return false;
  }

  // if res status is Unauthorized
  if (res.status == 401) {
    setModalContent('validation', {
      typeMessage: 'failed',
      action: () => (window.location.href = '/pages/login'),
      message: 'Sesi sudah berakhir harap login kembali',
    });
    return true;
  }
  setModalContent('validation', {
    typeMessage: 'failed',
    action: clearState,
    message: 'terjadi kesalahan',
  });
  return true;
};

// for fetchData from backedn
async function fetchData(setPositionList, setModalContent) {
  let response = await get_Position();
  if (
    isResponseError(response, setModalContent, () => {
      setModalContent('');
    })
  )
    return;
  response = await response.json();
  setPositionList(response.positions);
}

// for converting data to FormData
const convertToFormData = (position_name) => {
  const formData = new FormData();
  formData.append('position_name', position_name);
  return formData;
};

// to handle update
const handleUpdate = async (
  searchPosition,
  position_id,
  position_name,
  setModalContent,
  clearState,
  setPositionList,
) => {
  const selectedPosition = searchPosition(position_id);
  // Make the update request
  const res = await update_position(
    position_id,
    selectedPosition.position_name,
  );
  if (isResponseError(res, setModalContent, clearState)) return;
  // Fetch the updated position list after successful creation
  fetchData(setPositionList, setModalContent);
  // Reset the input field
  clearInput();
};

// to handle delete
const handleDelete = async (
  position_id,
  setModalContent,
  clearPosition,
  clearState,
  setPositionList,
) => {
  const res = await delete_position(position_id);
  if (isResponseError(res, setModalContent, clearState)) return;
  setModalContent('validation', {
    typeMessage: 'success',
    action: clearState,
    message: 'Data berhasil dihapus',
  });
  fetchData(setPositionList, setModalContent);
  clearPosition();
};

const Position = () => {
  const {
    position,
    position_list,
    setPosition,
    setPositionList,
    clearPosition,
  } = usePosition();
  const { clearState, modalContent, setModalContent } = useModalContent();

  useEffect(() => {
    fetchData(setPositionList, setModalContent);
  }, []);

  return (
    <div>
      <div
        className="container mx-auto mt-8 p-8 sm:p-8"
        // onClick={() => clearPosition()}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-4 text-center min-[360px]:max-[765px]:ml-[-3rem]">
            Input Posisi
          </h1>
          <div className="flex space-x-2 mb-4">
            <input
              placeholder="Posisi"
              value={position.position_name}
              onChange={(e) =>
                setPosition({ ...position, position_name: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md flex-1 min-[360px]:max-[765px]:w-[4rem]"
            />

            {position?.position_id != '' ? (
              <>
                <button
                  onClick={() =>
                    handleUpdate(
                      searchPosition,
                      position.position_id,
                      position.position_name,
                      setModalContent,
                      clearState,
                      setPositionList,
                    )
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={clearPosition}
                  className="bg-slate-500 text-white px-4 py-2 rounded-md"
                >
                  Clear
                </button>
              </>
            ) : (
              <button
                onClick={() =>
                  handleCreate(
                    clearPosition,
                    setModalContent,
                    clearState,
                    position.position_name,
                    setPositionList,
                  )
                }
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Create
              </button>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-8">
          <h1 className="text-3xl font-semibold mb-4 text-center ">
            Data Posisi
          </h1>
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Posisi</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {position_list.length > 0 &&
                position_list.map((ps, index) => (
                  <tr key={index} className="border-t mx-auto">
                    <td className="py-2 px-4">{ps.position_name}</td>
                    <td className="py-2 px-4 flex justify-center space-x-5">
                      <button
                        onClick={() =>
                          setPosition({
                            position_id: ps.position_id,
                            position_name: ps.position_name,
                          })
                        }
                        className="text-blue-500 underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(
                            ps.position_id,
                            setModalContent,
                            clearPosition,
                            clearState,
                            setPositionList,
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
        </div>
      </div>
      {modalContent}
    </div>
  );
};

export default Position;
