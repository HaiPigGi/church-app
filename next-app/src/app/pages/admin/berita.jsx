'use client';
import { useEffect, useState } from 'react';
// import beritaServices  from '@/app/api/Admin/berita/routes'
import { get_AllBerita, post_berita } from '@/app/api/Admin/berita/routes';
import Modal from '@/components/Fragments/Modal';
import BeritaCard from '@/components/Fragments/BeritaCard';
import { get_AllBerita_user } from '@/app/api/routes';

const berita = () => {
  const [beritaData, setBeritaData] = useState({
    image: null,
    title: '',
    content: '',
    event: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    contentError: '',
    titleError: '',
    imageError: '',
  });
  const [createBerita, setCreateBerita] = useState('');
  const [modalMessage, setModalMessage] = useState();
  const [openModal, setOpenModal] = useState(true);
  const [loadingFetching, setLoadingFetching] = useState(true);
  const [beritaDataList, setBeritaDataList] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == 'title') {
      if (value.length < 5) {
        setErrorMessage({
          ...errorMessage,
          titleError: 'Harus lebih dari 5 huruf',
        });
        return;
      }
      setErrorMessage({
        ...errorMessage,
        titleError: '',
      });
    } else if (name == 'content') {
      if (value.length < 10) {
        setErrorMessage({
          ...errorMessage,
          contentError: 'Harus lebih dari 10 huruf',
        });
        return;
      }
      setErrorMessage({
        ...errorMessage,
        contentError: '',
      });
    }

    setBeritaData({ ...beritaData, [name]: value });
  };

  //   const handleUpdate = async () => {
  //     try {
  //       const updatedBerita = await beritaServices.put_berita(beritaData);
  //       console.log('Berita updated:', updatedBerita);
  //       // Tambah logika atau tindakan selanjutnya jika diperlukan
  //     } catch (error) {
  //       console.error('Error updating berita:', error.message);
  //     }
  //   };

  const clearForm = () => {
    document.querySelector('#title').value = '';
    document.querySelector('#content').value = '';
    document.querySelector('#event').value = '';
    document.querySelector('#image').value = '';
  };

  async function getBeritaData() {
    const res = await get_AllBerita();
    setLoadingFetching(false);
    setBeritaDataList(res.data);
  }

  useEffect(() => {
    getBeritaData();
  }, [loadingFetching]);

  // method for add new news
  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('image', beritaData.image);
      formData.append('title', beritaData.title);
      formData.append('content', beritaData.content);
      formData.append('event', beritaData.event);
      let createdBerita = await post_berita(formData);
      setCreateBerita(createdBerita);
      setOpenModal(true);
      setModalMessage(
        <Modal
          type={createBerita.status == 'success' ? 'success' : 'danger'}
          action={() => {
            setOpenModal(!openModal);
            clearForm();
          }}
        >
          <div className="">
            {createdBerita.status == 'success' ? (
              <div className="flex justify-center items-center w-full h-24 text-green-500 animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  height="full"
                  fill="currentColor"
                >
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
                </svg>
              </div>
            ) : (
              <div className="flex justify-center items-center w-full h-24 text-red-500 animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="full"
                >
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
                </svg>
              </div>
            )}
            <h1
              className={
                createBerita.status == 'success'
                  ? 'text-red-500'
                  : 'text-green-500'
              }
            >
              {createBerita.message}
            </h1>
            <h1 className="text-slate-500 text-center ">
              klik ok untuk melanjutkan
            </h1>
          </div>
          ,
        </Modal>,
      );
    } catch (error) {
      console.error('Error creating berita:', error.message);
    }
  };

  function checkFileSize(e) {
    var fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }

    var fileSize = fileInput.files[0].size; // file size in bytes

    // Convert file size to megabytes
    var fileSizeInMB = fileSize / (1024 * 1024);

    if (fileSizeInMB < 20) {
      // Update beritaData.image with the File object
      setBeritaData({
        ...beritaData,
        image: fileInput.files[0],
      });
      console.log(typeof beritaData.image);
    } else {
      setErrorMessage({
        ...errorMessage,
        contentError: 'File size must be less than 20 MB',
      });
      console.log('ERROR AT IMAGE');
      // Clear the file input
      fileInput.value = '';
    }
  }

  return (
    <div className="relative z-20 pt-10 flex flex-col items-center justify-center h-screen w-auto">
      <h1 className="font-bold text-3xl mb-2">Tambah Berita</h1>
      <div className="grid grid-cols-2 ">
        <form
          id="form"
          action={handleSaveChanges}
          className="shadow-2xl opacity-50 w-full h-full p-10 "
        >
          <div className="flex flex-col mb-3">
            <label className="text-red-700 font-semibold mb-2 ">image :</label>
            <label htmlFor="content" className="block text-red-500">
              {errorMessage.imageError}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
              onChange={checkFileSize}
              placeholder="Images"
              required
            />
          </div>

          <label htmlFor="title" className="block text-red-500">
            {errorMessage.titleError}
          </label>
          <div className="flex flex-col mb-3">
            <input
              id="title"
              name="title"
              type="text"
              className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
              placeholder="Judul Berita"
              onChange={handleInputChange}
              required
            />
          </div>

          <label htmlFor="content" className="block text-red-500">
            {errorMessage.contentError}
          </label>
          <div className="flex flex-col mb-3">
            <textarea
              id="content"
              name="content"
              required
              placeholder="Content"
              className="w-full h-20 px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none  focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="flex flex-col mb-3">
            <textarea
              id="event"
              name="event"
              required
              placeholder="Event"
              className="w-full h-20 px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none  focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              // name='created_at'
              className="border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200"
            >
              Save changes
            </button>
            <button
              // onClick={handleUpdate}
              type="submit"
              name="updated_at"
              className="border-2 ml-[4rem] border-green-600 rounded-lg px-3 py-2 text-green-400 cursor-pointer hover:bg-green-600 hover:text-green-200"
            >
              Update
            </button>
            <button
              type="submit"
              name="deleted_at"
              // onClick={handleCancel}
              className=" border-2 ml-[5rem] border-red-600 rounded-lg px-3 py-2 text-red-400 cursor-pointer hover:bg-red-600 hover:text-red-200"
            >
              Batal
            </button>
          </div>
        </form>
        <AllBerita dataBerita={beritaDataList} />
      </div>
      {openModal ? modalMessage : ''}
    </div>
  );
};

const AllBerita = ({ dataBerita }) => {
  return (
    <div className="relative z-10 flex-col w-full px-5 py-2  h-full overflow-y-auto bg-white rounded-md">
      <h1 className="sticky top-0 left-0 px-2 py-2 mb-2 border-b border-primary w-full h-auto text-primary font-bold text-xl bg-white ">
        ALL Berita
      </h1>
      {dataBerita?.length > 0 ? (
        dataBerita.map((berita) => <BeritaCard data={berita} />)
      ) : (
        <h1 className="w-full h-full text-red-500 text-lg text-bold ">
          No berita yet
        </h1>
      )}
    </div>
  );
};

export default berita;
