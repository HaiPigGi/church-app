'use client'
import { useState,useEffect,Suspense } from 'react';
import { post_jenisMisa } from '@/app/api/Admin/jenismisa/routes';
import { get_jenisMisa } from '@/app/api/Admin/jenismisa/routes';
import { delete_jenismisa } from '@/app/api/Admin/jenismisa/routes';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Jenismisa() {
  const [posisi, setPosisi] = useState({
    jenis: '',
  });
  const [jenisMisaList, setJenisMisaList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleCreate = (e) => {
    const { name, value } = e.target;
    if (posisi) {
      setPosisi({ ...posisi, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await simpanData(posisi);
      setIsAlertOpen(true); // Show alert after successfully creating jenis misa
      setPosisi({ jenis: '' });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get_jenisMisa();
        setJenisMisaList(result.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await delete_jenismisa(id);
      if (res.ok) {
        setIsOpen(true);
        getAlljenismisa();
      } else {
        alert('Gagal menghapus jenis misa');
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const getAlljenismisa = async () => {
    let res = await get_jenisMisa();
    setJenisMisaList(res.data);
    return;
  };

  async function simpanData(datanya) {
    try {
      const data = datanya;
      const post_data = new FormData();
      post_data.append('jenis', data.jenis);

      const res = await post_jenisMisa(post_data);

      const updatedData = await get_jenisMisa();
      setJenisMisaList(updatedData.data);
    } catch (error) {
      console.log('error:', error);
    }
  }

  return (
    <div>
      <div className="container mx-auto mt-8 p-8 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-4 text-center min-[360px]:max-[765px]:ml-[-3rem]">
            Input Jenis Misa
          </h1>
          <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
            <input
              type="text"
              name='jenis'
              placeholder="Posisi"
              className="p-2 border border-gray-300 rounded-md flex-1 min-[360px]:max-[765px]:w-[4rem]"
              value={posisi.jenis}
              onChange={handleCreate}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Create
            </button>
          </form>
        </div>

        <div className="max-w-3xl mx-auto mt-8">
          <h1 className="text-3xl font-semibold mb-4 text-center">
            Data Jenis Misa
          </h1>
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Posisi</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {jenisMisaList.map((item, index) => (
                <tr key={index} className="border-t mx-auto">
                  <td className="py-2 px-4">{item.jenis}</td>
                  <td className="py-2 px-4 flex justify-center space-x-5">
                    <button
                      onClick={() => handleDelete(item.jenis_misa_id)}
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
      <Transition appear show={isAlertOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsAlertOpen(false)}
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
                  Berhasil membuat jenis misa
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Jenis misa telah berhasil dibuat.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    onClick={() => setIsAlertOpen(false)}
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}


