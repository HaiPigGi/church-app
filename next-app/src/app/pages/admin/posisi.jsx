import React, { useState } from 'react';

const Posisi = () => {
  const [posisi, setPosisi] = useState('');
  const [jabatanList, setJabatanList] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleCreate = () => {
    if (posisi.trim() === '') {
      alert('Posisi harus diisi.');
      return;
    }

    setJabatanList([...jabatanList, posisi]);
    setPosisi('');
  };

  const handleUpdate = () => {
    if (selectedIdx === null || posisi.trim() === '') {
      alert('Pilih posisi dan isi dengan benar.');
      return;
    }

    const updatedList = [...jabatanList];
    updatedList[selectedIdx] = posisi;

    setJabatanList(updatedList);
    setPosisi('');
    setSelectedIdx(null);
  };

  const handleDelete = () => {
    if (selectedIdx === null) {
      alert('Pilih posisi yang akan dihapus.');
      return;
    }

    const updatedList = [...jabatanList];
    updatedList.splice(selectedIdx, 1);

    setJabatanList(updatedList);
    setPosisi('');
    setSelectedIdx(null);
  };

  const handleEdit = (index) => {
    setPosisi(jabatanList[index]);
    setSelectedIdx(index);
  };

  return (
    <div>
    <div className="container mx-auto mt-8 p-8 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4 text-center min-[360px]:max-[765px]:ml-[-3rem]">Input Posisi</h1>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Posisi"
            value={posisi}
            onChange={(e) => setPosisi(e.target.value)}
            className="p-2 border border-gray-300 rounded-md flex-1 min-[360px]:max-[765px]:w-[4rem]"
          />
          {selectedIdx === null ? (
            <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded-md">
              Create
            </button>
          ) : (
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Update
            </button>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4 text-center ">Data Posisi</h1>
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Posisi</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {jabatanList.map((jabatan, index) => (
              <tr key={index} className="border-t mx-auto">
                <td className="py-2 px-4">{jabatan}</td>
                <td className="py-2 px-4 flex justify-center space-x-5">
                  <button onClick={() => handleEdit(index)} className="text-blue-500 underline">
                    Edit
                  </button>
                  <button onClick={handleDelete} className="text-red-500 underline">
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
