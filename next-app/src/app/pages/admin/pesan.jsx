'use client';
import React, { useState, useEffect } from 'react';
import { get_Saran } from '@/app/api/Admin/saran/route';
import { delete_pesan } from '@/app/api/Admin/saran/route';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Pesan() {
  const [saranList, setSaran] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get_Saran();
        console.log('hasilnya :', response);
        setSaran(response.sarans);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData(); // Panggil fungsi fetchData saat komponen dimuat
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await delete_pesan(id);
      if (res.ok) {
        setIsOpen(true);
        getAllpesan();
      } else {
        alert('Gagal menghapus jenis misa');
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const getAllpesan = async () => {
    let res = await get_Saran();
    setSaran(res.sarans);
    return;
  };

  return (
    <div className="w-full h-screen px-5">
      <div className="min-[360px]:max-[765px]:hidden">
        <h1 className="pt-7 pb-7 text-2xl font-semibold flex-1 text-center ">
          Pesan Dan Kritik
        </h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Pengirim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email Pengirim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pesan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                action
              </th>
            </tr>
          </thead>
          {saranList?.length > 0 && (
            <tbody className="bg-white divide-y divide-gray-200">
              {saranList?.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.email}</td>
                  <td
                    className="px-6 py-4 whitespace-wrap"
                    style={{
                      lineHeight: '1.4',
                      maxHeight: '4.2em',
                      overflow: 'hidden',
                    }}
                  >
                    {row.message}
                  </td>
                  <button onClick= {()=> handleDelete(row.saran_id)} className='px-6 py-4 whitespace-wrap text-red-600'>Hapus</button>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* for mobile */}
      <div className="min-[765px]:hidden">
        <h1 className="pt-7 pb-7 text-2xl font-semibold flex-1 text-center ">
          Pesan Dan Kritik
        </h1>
        <div className='flex flex-col'>
          {saranList?.map((row) => (
            <tr key={row.saran_id}>
              <label className="whitespace-nowrap font-bold text-lg text-red-500">
                {row.name}
              </label>
              <p
                className="px-6 py-4 whitespace-wrap font-Open Sans"
                style={{
                  lineHeight: '1.4',
                  maxHeight: '4.2em',
                  overflow: 'hidden',
                }}
              >
                {row.message}
              </p>
              <button onClick= {()=> handleDelete(row.saran_id)} className='px-6 py-4 whitespace-wrap text-red-600'>Hapus</button>
            </tr>
          ))}
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
              <div className="text-center inline-block w-full max-w-md p-6 my-8 overflow-hidden  align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className=" leading-6 text-green-400 text-3xl font-bold"
                >
                  BERHASIL
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    berhasil menghapus Saran.
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

      

    </div>
  );
}
