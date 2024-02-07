'use client';
import { useEffect, useRef, useState } from 'react';
// import beritaServices  from '@/app/api/Admin/berita/routes'
import {
  delete_berita,
  get_AllBerita,
  post_berita,
} from '@/app/api/Admin/berita/routes';
import { imageLoader } from '@/lib/ImageLoader';
import Image from 'next/image';
import useModalContent from '@/lib/customHooks/useModalContent';
import useBerita from '@/lib/customHooks/useBerita';
import { isResponseError } from './posisi';
import 'remixicon/fonts/remixicon.css';

const berita = () => {
  const { berita, berita_list, setBerita, setBeritaList, clearBerita } =
    useBerita();
  const [errorMessage, setErrorMessage] = useState({
    contentError: '',
    titleError: '',
    imageError: '',
  });
  const { modalContent, setModalContent, clearState } = useModalContent();
  const [loadingFetching, setLoadingFetching] = useState(true);
  const [shownImage, setShownImage] = useState();
  const fileInputRef = useRef(null);

  const checkInputs = (name, value) => {
    switch (name) {
      case 'title':
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
        break;
      case 'content':
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
          console.log('success');
        }
        break;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    checkInputs(name, value);
    setBerita({ ...berita, [name]: value });
    console.log(berita);
  };

  const handleDelete = async () => {
    if (berita?.berita_id) {
      let res = await delete_berita(berita);
      if (isResponseError(res, setModalContent, clearState)) return;
      setModalContent('validation', {
        typeMessage: 'success',
        action: clearState,
        message: 'Data berhasil dihapus',
      });
      getBeritaData();
      return;
    }
    setModalContent('validation', {
      typeMessage: 'failed',
      action: clearState,
      message: 'Harap pilih berita yang akan dihapus',
    });
  };

  async function getBeritaData() {
    let res = await get_AllBerita();
    if (isResponseError(res, setModalContent, clearState)) return;
    res = await res.json();
    setBeritaList(res.data);
    setLoadingFetching(false);
    return;
  }

  useEffect(() => {
    getBeritaData();
  }, []);

  // Convert beritaData to FormData
  const convertToFormData = () => {
    const formData = new FormData();
    formData.append('image', berita.image);
    formData.append('title', berita.title);
    formData.append('content', berita.content);
    formData.append('event', berita.event);
    return formData;
  };

  // method for add new news
  const handleSave = async () => {
    const formData = convertToFormData();
    let res = await post_berita(formData);
    if (isResponseError(res, setModalContent, clearState)) return;
    setLoadingFetching(false);
    setModalContent('validation', {
      typeMessage: 'success',
      message: 'Data berhasil disimpan',
      action: clearState,
    });
    getBeritaData();
  };

  function findBeritaBasedID(id) {
    return berita_list.find((data) => data.berita_id == id);
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
      const dataImage = fileInput.files[0];
      setBerita({
        ...berita,
        image: dataImage,
      });
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
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setShownImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative pt-5 md:flex items-center justify-center h-screen w-full px-2">
      <h1 className="font-bold text-3xl mb-2 md:hidden">Tambah Berita</h1>
      <div className="md:grid md:grid-cols-2 ">
        <form
          id="form"
          className="shadow-2xl w-[95%] h-full px-5 py-2 bg-white "
        >
          <div className="flex flex-col mb-3">
            <label className="text-red-700 font-semibold mb-2 ">image :</label>
            <label htmlFor="content" className="block text-red-500">
              {errorMessage.imageError}
            </label>
            <div
              onClick={() => fileInputRef.current.click()}
              className="w-full h-44 md:h-56 border-2 border-primary flex justify-center items-center rounded-md"
            >
              {shownImage ? (
                <div className="relative w-full h-full py-2 rounded-md overflow-hidden">
                  <Image
                    src={shownImage}
                    alt={berita.title}
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
                value={berita.image != '' && null}
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
              value={berita.title}
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
              value={berita.content}
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
              value={berita.event}
            ></textarea>
          </div>

          <div className="flex justify-start items-center">
            <button
              type="button"
              onClick={() => {
                setModalContent('confirmation', {
                  actionAcc: () => handleSave(),
                  actionDecline: clearState,
                });
              }}
              className=" bg-green-500 rounded-lg w-24 py-2 text-white cursor-pointer hover:bg-green-400 hover:text-black"
            >
              Tambah
            </button>
            <button
              type="button"
              name="deleted_at"
              onClick={() => {
                setModalContent('confirmation', {
                  actionAcc: () => handleDelete(),
                  actionDecline: clearState,
                });
              }}
              className=" border-2 border-red-600 rounded-lg w-24 py-2 text-red-500 cursor-pointer hover:bg-red-600 hover:text-black mx-4"
            >
              Hapus
            </button>
            <button
              onClick={() => {
                clearBerita();
                setShownImage();
              }}
              type="button"
              name="updated_at"
              className="border-2 border-slate-500 rounded-lg w-24 py-2 text-slate-500 cursor-pointer hover:bg-slate-500 hover:text-white"
            >
              Bersihkan
            </button>
          </div>
        </form>
        <div className="hidden md:block">
          {loadingFetching ? (
            <BeritaCardSkeleton />
          ) : (
            <AllBerita
              dataBerita={berita_list}
              action={{
                selectBerita: (id) => {
                  console.log('BeritaID : ', id);
                  const data = findBeritaBasedID(id);
                  console.log('Berita Data : ', data);
                  setBerita(data);
                  setShownImage(data.image.url);
                },
                clearState,
              }}
            />
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() =>
          setModalContent('show', {
            content: loadingFetching ? (
              <BeritaCardSkeleton />
            ) : (
              <AllBerita
                dataBerita={berita_list}
                action={{
                  selectBerita: (id) => {
                    const data = findBeritaBasedID(id);
                    setBerita(data);
                    setShownImage(data.image.url);
                  },
                  clearState,
                }}
              />
            ),
          })
        }
        className="bg-blue-500 text-white px-2 pb-1 pt-2 rounded-md mr-2 sm:mr-2 sm:mb-0 md:hidden absolute right-4 bottom-10"
      >
        <i class="ri-list-view ri-xl"></i>
      </button>
      {modalContent}
    </div>
  );
};

const BeritaCard = ({ data }) => {
  return (
    <div
      data-testid="pathnameTest"
      className="block mx-auto w-full  h-full mb-5 text-left"
    >
      <div className="flex justify-start items-center h-full">
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
  const { clearState, selectBerita } = action;
  return (
    <div className=" z-10 flex-col w-full px-2 md:px-5 py-2  h-full  bg-white rounded-md md:border-l md:border-slate-500">
      <h1 className="sticky top-0 left-0 px-2 py-2 mb-2 border-b border-primary w-full h-auto text-primary font-bold text-xl bg-white ">
        ALL Berita
      </h1>
      <button className="absolute top-1 right-0" onClick={clearState}>
        <i class="ri-close-circle-fill text-black ri-xl"></i>{' '}
      </button>
      <div className="w-full flex-col items-center justify-center overflow-y-auto max-h-[75vh]">
        {dataBerita?.length > 0 ? (
          dataBerita.map((berita) => (
            <button
              key={berita.berita_id}
              onClick={() => selectBerita(berita.berita_id)}
              className="w-full shadow-xl h-40 bg-white/90 rounded-xl overflow-hidden"
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
