import { useState, useEffect } from 'react';
import { delete_JadwalMisa } from '@/app/api/Admin/jadwalMisa/routes';
import { get_JadwalMisa } from '@/app/api/Admin/jadwalMisa/routes';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { isResponseError } from './posisi';
import useModalContent from '@/lib/customHooks/useModalContent';

export default function lihatjadwal() {
  const [Jadwal, setJadwal] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const {clearState,modalContent,setModalContent} = useModalContent();

  const handleDelete = async (id) => {
    try {
      const res = await delete_JadwalMisa(id);
      if(isResponseError(res,setModalContent,clearState))return;
      setModalContent("validation", {
        message:"Data Berhasil Dihapus",
        typeMessage:"success",
        action:() => {
          clearState();
          getAlljadwalmisa();
        },
      })
      
    } catch (error) {
      console.log('Error:', error.message);
      alert('Terjadi kesalahan saat menghapus jenis misa'); // Memberikan pesan kesalahan kepada pengguna
    }
  };

  useEffect(() => {

    getAlljadwalmisa();
  }, []);

  const getAlljadwalmisa = async () => {
    let res = await get_JadwalMisa();
    setJadwal(res?.data);
    return;
  };
  return (
    <div className="max-w-3xl mx-auto mt-8 h-full w-full">
      <h1 className="text-3xl font-semibold mb-4 text-center">
        Daftar Jadwal Misa
      </h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Hari</th>
            <th className="py-2 px-4 border-b">Waktu Mulai</th>
            <th className="py-2 px-4 border-b">Waktu selesai</th>
            <th className="py-2 px-4 border-b">Jenis Misa</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {Jadwal?.map((item) => (
            <tr key={item.jenis_misa_id} className="border-t mx-auto">
              <td className="py-2 px-4">{item.hari}</td>
              <td className="py-2 px-4">{item.waktu_mulai}</td>
              <td className="py-2 px-4">{item.waktu_selesai}</td>
              <td className="py-2 px-4">{item.jenis_misa.jenis}</td>
              <td className="py-2 px-4 flex justify-center space-x-5">
                <button
                  onClick={() => handleDelete(item.jadwal_misa_id)}
                  className="text-red-500 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Berhasil menghapus jenis misa
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    berhasil menghapus jenis misa.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {modalContent}
    </div>
  );
}
