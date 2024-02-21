'use client';
import { useState, useEffect } from 'react';
import { post_JadwalMisa } from '@/app/api/Admin/jadwalMisa/routes';
import { get_jenisMisa } from '@/app/api/Admin/jenismisa/routes';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import useModalContent from '@/lib/customHooks/useModalContent';
import { isResponseError } from './posisi';

export default function jadwal() {
  const [Jadwa, setJadwal] = useState({
    hari: 'senin',
    waktu_mulai: '00:00',
    waktu_selesai: '00:00',
    jenis_misa_id: '',
  });

  const [jenisMisaOptions, setJenisMisaOptions] = useState([]);
  const {clearState,modalContent,setModalContent} = useModalContent();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  async function fetchJenisMisa() {
    const worshipTypes = await get_jenisMisa();
    setJenisMisaOptions(worshipTypes.data);
  }
  useEffect(() => {
    fetchJenisMisa();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
      setJadwal({
        ...Jadwa,
        [name]: value,
      });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = convertToFormData(Jadwa)
      console.log(Jadwa);
      let res = await post_JadwalMisa(data);
      if(isResponseError(res,setModalContent,clearState)){
        res = await res.json();
        
        setErrorMessage((res.error?.waktu_selesai||res.error?.waktu_mulai) ? 
          "Waktu selesai lebih kecil dari waktu mulai, harap ganti!!!"
          :
          ""
          );
        return
      };
      setIsAlertOpen(true);
      setJadwal({
        hari: '',
        waktu_mulai: '',
        waktu_selesai: '',
        jenis_misa_id: '',
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  

  const convertToFormData = () => {
    const { hari, jenis_misa_id, waktu_mulai, waktu_selesai } = Jadwa;
    const formData = new FormData();
    formData.append('hari', hari);
    formData.append('jenis_misa_id', jenis_misa_id);
    formData.append('waktu_mulai', waktu_mulai);
    formData.append('waktu_selesai', waktu_selesai);
    return formData;
  };

  return (
    <div className="pt-10 flex flex-col items-center justify-center w-full h-full px-5">
      <h1 className="font-bold text-3xl mb-2 min-[360px]:max-[765px]:text-xl">
        Tambah Jadwal Misa
      </h1>
      <form
        onSubmit={handleSubmit}
        className="shadow-2xl h-[82vh] w-[100vh] p-5 min-[360px]:max-[765px]:w-[40vh] min-[360px]:max-[765px]:h-[88vh]  "
      >
        <div className="flex flex-col mb-3">
          <label className="text-red-700 font-mono mb-2 ">Jenis Misa</label>
          <select
            name="jenis_misa_id"
            className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 min-[360px]:max-[765px]:w-[33vh]"
            required
            onChange={handleInput}
          >
            <option disable>select</option>
            {jenisMisaOptions.map((option, index) => (
              <option key={index} value={option.jenis_misa_id}>
                {option.jenis}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-3">
          <label className="text-red-700 font-mono mb-2 ">Hari Misa</label>
          <select
            name="hari"
            className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100
                min-[360px]:max-[765px]:w-[33vh] "
            value={Jadwa.hari}
            onChange={handleInput}
          >
            <option value="select">select</option>
            <option value="senin">Senin</option>
            <option value="selasa">Selasa</option>
            <option value="rabu">Rabu</option>
            <option value="kamis">Kamis</option>
            <option value="jumat">Jumat</option>
            <option value="sabtu">Sabtu</option>
            <option value="minggu">Minggu</option>
          </select>
        </div>

        <div className="flex flex-col mb-3">
          <label className="text-red-700 font-mono mb-2 ">Waktu Mulai</label>
          <input
            type="time"
            name="waktu_mulai"
            className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100
                    min-[360px]:max-[765px]:w-[33vh]"
            required
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="text-red-700 font-mono mb-2 ">Waktu Selesai</label>
          <input
            name="waktu_selesai"
            type="time"
            className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100
                    min-[360px]:max-[765px]:w-[33vh]"
            required
            onChange={handleInput}
          />
        </div>
        <h1 className='text-red-500 font-bold text-md'>{errorMessage}</h1>
        <div className="flex justify-center mb-3 min-[360px]:max-[765px]:justify-start min-[360px]:max-[765px]:ml-16">
          <button
            type="submit"
            className="border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200"
          >
            save
          </button>
        </div>
      </form>

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
                  Berhasil menambahkan jadwal misa
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Jadwal misa telah berhasil ditambahkan.
                  </p>
                </div>

                <div className="mt-4 flex">
                  <button
                    type="button"
                    className="inline-flex justify-center  px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
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
      {modalContent}
    </div>
  );
}
