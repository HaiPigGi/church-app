import { useState, useEffect } from 'react';
import { get_dokumentasi } from '@/app/api/Admin/dokementasi/routes';
import { post_Images } from '@/app/api/Admin/dokementasi/routes';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import useModalContent from '@/lib/customHooks/useModalContent';

export default function AllDokumentasi() {
  const [Dok, setDok] = useState({
    tahun: '',
    jenis_kegiatan: '',
    // images: null //  null sebagai nilai awal untuk input file
  });

  const [alert, setAlert] = useState({
    isOpen: false,
    title: '',
    message: '',
  });
  const [Image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const MAX_IMAGES = 15;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image[]' && files.length > 0) {
      // Validasi jumlah file gambar
      if (Image.length + files.length > MAX_IMAGES) {
        setAlert({
          isOpen: true,
          title: 'Max file limit reached',
          message: `You can only upload up to ${MAX_IMAGES} images.`,
          onClose: () => (window.location.href = '/pages/admin'),
        });
        return;
      }
      
      // Menambahkan gambar-gambar baru ke array Images
      setImage([...Image, ...Array.from(files)]);
    } else {
      setDok({ ...Dok, [name]: value });
    }
  };

  const fetchData = async () => {
    const result = await get_dokumentasi();
    setDok(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Dok.tahun < 2000 && !Dok.tahun > 2048) {
      setAlert({
        isOpen: true,
        title: 'Tahun tidak valid',
        message: 'Masukkan tahun antara 2000 dan 2048 saja.',
        onClose: () => (window.location.href = '/pages/admin'),
      });
      return;
    }
    setIsLoading(true);
    await simpanImages(Dok, Image);
    setIsLoading(false);
    setDok({
      tahun: '',
      jenis_kegiatan: '',
    });
  };

  async function simpanImages(datanya, gambar) {
    const formData = convert(datanya, gambar);
    const res = await post_Images(formData); // Gunakan formData, bukan data
    setAlert({
      isOpen: true,
      title: res?.error ? 'Error' : 'Berhasil',
      message: res?.message ? res.message : res.error,
      onClose: () => (window.location.href = '/pages/admin'),
    });
    clearData();
  }

  const clearData = () => {
    setDok({
      tahun: '',
      jenis_kegiatan: '',
    });
    setImage([]);
  };

  const convert = ({ tahun, jenis_kegiatan }, images) => {
    const formData = new FormData();
    const date = new Date(tahun);
    const y = date.getFullYear();
    formData.append('tahun', y);
    formData.append('jenis_kegiatan', jenis_kegiatan);

    // Append each selected image individually
    images.forEach((image, index) => {
      formData.append(`image[]`, image); // Gunakan kunci 'image' diikuti dengan []
    });

    return formData;
  };

  return (
    <div className="pt-20 flex flex-col items-center justify-center h-[60%] w-auto ">
      <label className="font-bold text-3xl mb-2 mt-10 min-[360px]:max-[765px]:text-xl">
        Tambahkan Dokumentasi
      </label>
      <form
        onSubmit={handleSubmit}
        className=" shadow-2xl h-[82vh] w-[100vh] p-5 "
        encType="multipart/form-data" 
      >
        {/* gambar */}
        <div className="flex flex-col mb-3">
          <label className="text-red-700 font-mono mb-2 ">Image :</label>
          <input
            type="file"
            name="image[]"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 min-[360px]:max-[765px]:w-[33vh]"
            placeholder="Image"
            required
          />
        </div>
        {/* tahun */}
        <div className="flex flex-col mb-3">
          <label className="text-red-700 font-mono mb-2 ">
            Tahun Kegiatan :
          </label>
          <input
            type="date"
            name="tahun"
            value={Dok.tahun}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 min-[360px]:max-[765px]:w-[33vh]"
            placeholder="Tahun Kegiatan"
            required
          />
        </div>
        {/* nama kegiatan */}
        <div className="flex flex-col mb-3">
          <label className="text-red-700 font-mono mb-2 ">
            Jenis Kegiatan :
          </label>
          <select
            name="jenis_kegiatan"
            className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 min-[360px]:max-[765px]:w-[33vh] "
            onChange={handleChange}
          >
            <option value="select">select</option>
            <option value="natal">Natal</option>
            <option value="paskah">Paskah</option>
            <option value="misdinar">Misdinar</option>
            <option value="OMK">OMK</option>
            <option value="DPP">DPP</option>
            <option value="kegiatan lain">Kegiatan Lain</option>
          </select>
        </div>
        <div className="flex justify-center mb-3">
          <button className="border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200 relative">
            {isLoading && (
              <div className="absolute top-0 left-0 h-full bg-red-400 rounded-full animate-slide" />
            )}
            {isLoading ? 'Loading' : 'Submit'}
          </button>
        </div>
        <Alert
          isOpen={alert.isOpen}
          title={alert.title}
          message={alert.message}
          onClose={alert.onClose}
        />
        ;
      </form>
    </div>
  );
}
const Alert = ({ isOpen, title, message, onClose }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>

                <div className="mt-4">
                  <button
                    onClick={onClose} // Panggil onClose saat tombol diklik
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    OK
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

