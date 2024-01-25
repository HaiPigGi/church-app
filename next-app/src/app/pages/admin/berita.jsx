'use client';
import { useEffect, useRef, useState } from 'react';
// import beritaServices  from '@/app/api/Admin/berita/routes'
import {
  get_AllBerita,
  post_berita,
  put_berita,
} from '@/app/api/Admin/berita/routes';
import Modal from '@/components/Fragments/Modal';
import { get_AllBerita_user } from '@/app/api/routes';
import { imageLoader } from '@/lib/ImageLoader';
import Image from 'next/image';
import ModalKonfirmasi from '@/components/Fragments/Modal/ModalKonfirmasi';

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
  const [loadingFetching, setLoadingFetching] = useState(true);
  const [beritaDataList, setBeritaDataList] = useState();
  const [shownImage, setShownImage] = useState();
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == 'title') {
      if (value.length < 5) {
        setErrorMessage({
          ...errorMessage,
          titleError: 'Harus lebih dari 5 huruf',
        });
      } else {
        setErrorMessage({
          ...errorMessage,
          titleError: '',
        });
      }
    } else if (name == 'content') {
      if (value.length < 10) {
        setErrorMessage({
          ...errorMessage,
          contentError: 'Harus lebih dari 10 huruf',
        });
      } else {
        setErrorMessage({
          ...errorMessage,
          contentError: '',
        });
      }
    }

    setBeritaData({ ...beritaData, [name]: value });
  };

  const handleUpdate = async () => {
    setLoadingFetching(true);
    const data = convertToFormData();
    console.log(data.get('berita_id'));
    console.log(data.get('title'));
    console.log(data.get('content'));
    console.log(data.get('event'));
    if (data.get('berita_id')) {
      try {
        const updatedBerita = await put_berita(data);
        setModalMessage(
          <Modal
            type={updatedBerita.status == 'success' ? 'success' : 'danger'}
            action={() => {
              clearForm();
              setModalMessage('');
            }}
          >
            <div className="">
              {updatedBerita.status == 'success' ? (
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
                  updatedBerita.status == 'success'
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {updatedBerita.message}
              </h1>
              <h1 className="text-slate-500 text-center ">
                klik ok untuk melanjutkan
              </h1>
            </div>
            ,
          </Modal>,
        );

        // Tambah logika atau tindakan selanjutnya jika diperlukan
      } catch (error) {
        console.error('Error updating berita:', error.message);
      }
      return;
    }
    setModalMessage(
      <Modal
        type="danger"
        action={() => {
          clearForm();
          setModalMessage('');
        }}
      >
        <div className="">
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
          <h1 className="text-red-500">
            Belum memilih berita yang akan dirubah
          </h1>
          <h1 className="text-slate-500 text-center ">
            klik ok untuk melanjutkan
          </h1>
        </div>
        ,
      </Modal>,
    );
  };

  const clearForm = () => {
    document.querySelector('#title').value = '';
    document.querySelector('#content').value = '';
    document.querySelector('#event').value = '';
    document.querySelector('#image').value = '';
  };

  async function getBeritaData() {
    const res = await get_AllBerita();
    setLoadingFetching(false);
    if (res) {
      setBeritaDataList(res.data);
      return;
    }
    if (res.error == 'Unauthorize') {
      window.location.href = '/';
    }
    setLoadingFetching(false);
    setErrorMessage(res);
  }

  useEffect(() => {
    getBeritaData();
  }, [loadingFetching]);

  const convertToFormData = () => {
    const formData = new FormData();
    if (beritaData?.berita_id)
      formData.append('berita_id', beritaData.berita_id);
    formData.append('image', beritaData.image);
    formData.append('title', beritaData.title);
    formData.append('content', beritaData.content);
    formData.append('event', beritaData.event);
    return formData;
  };

  // method for add new news
  const handleSaveChanges = async () => {
    setCreateBerita('');
    setModalMessage('');
    try {
      const formData = convertToFormData();
      let createdBerita = await post_berita(formData);
      setLoadingFetching(false);
      setCreateBerita(createdBerita);
      setModalMessage(
        <Modal
          type={createBerita.status == 'success' ? 'success' : 'danger'}
          action={() => {
            clearForm();
            setModalMessage('');
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

  function findBeritaBasedID(id) {
    console.log(beritaDataList.find((data) => data.berita_id == id));
    return beritaDataList.find((data) => data.berita_id == id);
  }

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
      console.log(beritaData.image);
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

  const handleImageChange = (e) => {
    console.log(e.target);
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setShownImage(reader.result);
        console.log(shownImage);
      };
      reader.readAsDataURL(file);
      beritaData.image = file;
    }
  };

  return (
    <div className="relative z-20 pt-5 flex flex-col items-center justify-center h-screen w-auto px-1">
      <h1 className="font-bold text-3xl mb-2">Tambah Berita</h1>
      <div className="grid grid-cols-2 ">
        <form id="form" className="shadow-2xl w-full h-full px-5 py-2   ">
          <div className="flex flex-col mb-3">
            <label className="text-red-700 font-semibold mb-2 ">image :</label>
            <label htmlFor="content" className="block text-red-500">
              {errorMessage.imageError}
            </label>
            <div
              onClick={() => fileInputRef.current.click()}
              className="w-full h-56 border-2 border-primary flex justify-center items-center rounded-md"
            >
              {shownImage ? (
                <div className="relative w-full h-full py-2 rounded-md overflow-hidden">
                  <Image
                    src={shownImage}
                    alt={beritaData.title}
                    fill={true}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="text-center w-56 h-auto text-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width={100}
                    height={100}
                    className="mx-auto"
                  >
                    <path d="M5 11.1005L7 9.1005L12.5 14.6005L16 11.1005L19 14.1005V5H5V11.1005ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7C16.3284 7 17 7.67157 17 8.5C17 9.32843 16.3284 10 15.5 10Z"></path>
                  </svg>
                  <h1>Klik untuk menambahkan gambar</h1>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                id="image"
                name="image"
                accept="image/*"
                className="hidden w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
                onChange={(e) => {
                  handleImageChange(e);
                  checkFileSize(e);
                }}
                placeholder="Images"
                required
              />
            </div>
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
              value={beritaData.title}
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
              value={beritaData.content}
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
              value={beritaData.event}
            ></textarea>
          </div>

          <div className="flex justify-start items-center">
            <button
              type="button"
              onClick={() => {
                setModalMessage(
                  <ModalKonfirmasi>
                    <h1 className="text-2xl font-bold text-pretty">
                      Apakah yakin ingin melanjutkan proses?
                    </h1>
                    <div className="flex justify-center items-center">
                      <button
                        onClick={handleSaveChanges}
                        className="px-5 py-2 text-white rounded-md bg-green-500 hover:bg-green-300"
                      >
                        Lanjut
                      </button>
                      <button
                        onClick={() => setModalMessage('')}
                        className="px-5 py-2 text-white rounded-md bg-red-500 hover:bg-red-300 "
                      >
                        Batal
                      </button>
                    </div>
                  </ModalKonfirmasi>,
                );
              }}
              className="border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200"
            >
              Save changes
            </button>
            <button
              onClick={() => {
                console.log('execute');
                setModalMessage(
                  <ModalKonfirmasi>
                    <h1 className="text-2xl font-bold text-pretty mb-5 text-center">
                      Apakah yakin ingin melanjutkan proses?
                    </h1>
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={handleUpdate}
                        className="px-5 py-2 text-white rounded-md bg-green-500 hover:bg-green-300"
                      >
                        Lanjut
                      </button>
                      <button
                        onClick={() => setModalMessage('')}
                        className="px-5 py-2 text-white rounded-md bg-red-500 hover:bg-red-300 "
                      >
                        Batal
                      </button>
                    </div>
                  </ModalKonfirmasi>,
                );
                return;
              }}
              type="button"
              name="updated_at"
              className="border-2 mx-4 border-green-600 rounded-lg px-3 py-2 text-green-400 cursor-pointer hover:bg-green-600 hover:text-green-200"
            >
              Update
            </button>
            <button
              type="button"
              name="deleted_at"
              onClick={() => {
                setModalMessage(
                  <ModalKonfirmasi>
                    <h1>Apakah yakin ingin melanjutkan proses?</h1>
                    <div className="flex justify-center items-center">
                      <button
                        onClick={''}
                        className="px-5 py-2 text-white rounded-md bg-green-500 hover:bg-green-300"
                      >
                        Lanjut
                      </button>
                      <button
                        onClick={() => setModalMessage('')}
                        className="px-5 py-2 text-white rounded-md bg-red-500 hover:bg-red-300 "
                      >
                        Batal
                      </button>
                    </div>
                  </ModalKonfirmasi>,
                );
              }}
              className=" border-2 mx-4 border-red-600 rounded-lg px-3 py-2 text-red-400 cursor-pointer hover:bg-red-600 hover:text-red-200"
            >
              Batal
            </button>
          </div>
        </form>
        {loadingFetching ? (
          <BeritaCardSkeleton />
        ) : (
          <AllBerita
            dataBerita={beritaDataList}
            action={(id) => {
              const data = findBeritaBasedID(id);
              setBeritaData(data);
              setShownImage(data.image.url);
            }}
          />
        )}
      </div>
      {modalMessage}
    </div>
  );
};

const BeritaCard = ({ data }) => {
  return (
    <div
      data-testid="pathnameTest"
      className="block mx-auto w-full max-w-[500px] h-full mb-5 bg-white/90 rounded-xl overflow-hidden text-left"
    >
      <div className="flex justify-center items-center h-full">
        <div className="relative w-56 min-w-36 max-w-56 h-full  rounded-xl overflow-hidden me-2">
          <Image
            src={imageLoader(data.image.path)}
            fill={true}
            alt={data.title}
            className="object-cover"
            data-testid="imgTest"
          />
        </div>
        <div className="p-2 w-96">
          <h1
            className="line-clamp-2 text-base font-bold "
            data-testid="titleTest"
          >
            {data.title}
          </h1>
          <p
            className="line-clamp-3 text-base font-light text-pretty"
            data-testid="descTest"
          >
            {data.content}
          </p>
        </div>
      </div>
    </div>
  );
};

const BeritaCardSkeleton = () => {
  return (
    <div className="relative z-10 flex-col w-full px-5 py-2  h-full  bg-white rounded-md">
      <h1 className="sticky top-0 left-0 px-2 py-2 mb-2 border-b border-primary w-full h-auto text-primary font-bold text-xl bg-white ">
        ALL Berita
      </h1>
      <div className="w-full flex-col items-center justify-center overflow-y-auto">
        <div
          data-testid="pathnameTest"
          className="block shadow-xl mx-auto w-full w-[450px] h-36 mb-5 bg-white rounded-xl overflow-hidden text-left"
        >
          <div className="flex justify-center items-center">
            <div className="relative w-36 w-44 max-w-56 h-36  rounded-xl overflow-hidden me-2 bg-slate-500 animate-pulse"></div>
            <div className="ms-2">
              <div className="bg-slate-500 w-20 h-4 rounded-md animate-pulse"></div>
              <div className="bg-slate-500 w-80 mt-2 h-14 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
        <div
          data-testid="pathnameTest"
          className="block shadow-xl mx-auto w-full w-[450px] h-36 mb-5 bg-white rounded-xl overflow-hidden text-left"
        >
          <div className="flex justify-center items-center">
            <div className="relative w-36 w-44 max-w-56 h-36  rounded-xl overflow-hidden me-2 bg-slate-500 animate-pulse"></div>
            <div className="ms-2">
              <div className="bg-slate-500 w-20 h-4 rounded-md animate-pulse"></div>
              <div className="bg-slate-500 w-80 mt-2 h-14 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
        <div
          data-testid="pathnameTest"
          className="block shadow-xl mx-auto w-full w-[450px] h-36 mb-5 bg-white rounded-xl overflow-hidden text-left"
        >
          <div className="flex justify-center items-center">
            <div className="relative w-36 w-44 max-w-56 h-36  rounded-xl overflow-hidden me-2 bg-slate-500 animate-pulse"></div>
            <div className="ms-2">
              <div className="bg-slate-500 w-20 h-4 rounded-md animate-pulse"></div>
              <div className="bg-slate-500 w-80 mt-2 h-14 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllBerita = ({ dataBerita, action }) => {
  return (
    <div className="relative z-10 flex-col w-full px-5 py-2  h-[82.5vh]  bg-white rounded-md border-l border-slate-500">
      <h1 className="sticky top-0 left-0 px-2 py-2 mb-2 border-b border-primary w-full h-auto text-primary font-bold text-xl bg-white ">
        ALL Berita
      </h1>
      <div className="w-full flex-col items-center justify-center overflow-y-auto px-2 h-full">
        {dataBerita?.length > 0 ? (
          dataBerita.map((berita) => (
            <button
              key={berita.berita_id}
              onClick={() => action(berita.berita_id)}
              className="w-full shadow-xl h-40"
            >
              <BeritaCard data={berita} />
            </button>
          ))
        ) : (
          <h1 className="w-full h-full text-red-500 text-lg text-bold ">
            No berita yet
          </h1>
        )}
      </div>
    </div>
  );
};

export default berita;
