import React, { useState, useEffect } from 'react';
import {
  post_position,
  get_Position,
  update_position,
  delete_position,
} from '@/app/api/Admin/position/route';

const Posisi = () => {
  const [posisi, setPosisi] = useState({
    position_name: '',
  });
  const [jabatanList, setJabatanList] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const positionsResponse = await get_Position();
        console.log(positionsResponse);

        setJabatanList(positionsResponse);
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    }

    fetchData();
  }, []);

  const handleCreate = async () => {
    try {
      console.log('cek Data posisi yang disimpan : ', posisi);

      // Make object FormData
      const formData = new FormData();
      formData.append('position_name', posisi.position_name);

      // Create connection to the server
      const res = await post_position(formData);

      // Fetch the updated position list after successful creation
      let positionsResponse = await get_Position();
      positionsResponse = await positionsResponse.json();
      // Update the state with the new position list
      setJabatanList(positionsResponse.positions);

      // Reset the input field
      setPosisi({
        position_name: '',
      });
    } catch (error) {
      console.error('Terjadi Kesalahan saat Menyimpan Posisi : ', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const selectedPosition = jabatanList[selectedIdx];

      console.log('Selected Position:', selectedPosition);

      // Modify the updatedPosition object to include 'position_name'
      const updatedPosition = {
        position_id: selectedPosition.position_id,
        position_name: posisi.position_name,
      };

      // Make the update request
      const res = await update_position(
        updatedPosition.position_id,
        updatedPosition,
      );

      // Fetch the updated position list after successful creation
      const positionsResponse = await get_Position();
      console.log(positionsResponse);

      // Update the state with the new position list
      setJabatanList(positionsResponse);

      // Reset the input field
      setPosisi({
        position_name: '',
      });
    } catch (error) {
      console.error('Error updating position:', error);
      // Handle the error as needed, update UI, or show a message to the user
    }
  };

  const handleDelete = async (position_id) => {
    // Make the delete request
    const deletionResult = await delete_position(position_id);

    // Handle the deletion result
    if (deletionResult.success) {
      console.log(deletionResult.message);
      // Fetch the updated position list after successful deletion
      const positionsResponse = await get_Position();
      setJabatanList(positionsResponse);
      // Reset the input field and selected index
      setPosisi({ position_name: '' });
      setSelectedIdx(null);
    } else {
      console.error('Error deleting position:', deletionResult.message);
      // Handle the error as needed, update UI, or show a message to the user
    }
  };

  const handleEdit = (index) => {
    setPosisi(jabatanList[index]);
    setSelectedIdx(index);
  };

  return (
    <div>
      <div className="container mx-auto mt-8 p-8 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-4 text-center min-[360px]:max-[765px]:ml-[-3rem]">
            Input Posisi
          </h1>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Posisi"
              value={posisi.position_name}
              onChange={(e) => setPosisi({ position_name: e.target.value })}
              className="p-2 border border-gray-300 rounded-md flex-1 min-[360px]:max-[765px]:w-[4rem]"
            />

            {selectedIdx === null ? (
              <button
                onClick={handleCreate}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Create
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Update
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
              {jabatanList.map((jabatan, index) => (
                <tr key={index} className="border-t mx-auto">
                  <td className="py-2 px-4">{jabatan.position_name}</td>
                  <td className="py-2 px-4 flex justify-center space-x-5">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-500 underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(jabatan.position_id)}
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
    </div>
  );
};

export default Posisi;
