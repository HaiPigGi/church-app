'use client';
import { useState } from 'react';
// import beritaServices  from '@/app/api/Admin/berita/routes'
import { post_berita } from '@/app/api/Admin/berita/routes';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == 'title' && value.length < 5) {
      setErrorMessage({
        ...errorMessage,
        titleError: 'Harus lebih dari 5 huruf',
      });
      return;
    } else if (name == 'content' && value.length < 10) {
      setErrorMessage({
        ...errorMessage,
        contentError: 'Harus lebih dari 10 huruf',
      });
      return;
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

  // method for add new news
  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('image', beritaData.image);
      formData.append('title', beritaData.title);
      formData.append('content', beritaData.content);
      formData.append('event', beritaData.event);
      console.log(formData);
      let createdBerita = await post_berita(formData);
      console.log('Berita created:', createdBerita);
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
      console.log(typeof fileInput.value);
      // Update beritaData.image with the File object

      setBeritaData({
        ...beritaData,
        image: fileInput.files[0],
      });
    } else {
      setErrorMessage({
        ...errorMessage,
        contentError: 'File size must be less than 20 MB',
      });
      // Clear the file input
      fileInput.value = '';
    }
  }

  return (
    <div className="pt-10 flex flex-col items-center justify-center h-auto w-auto">
      <h1 className="font-bold text-3xl mb-2">Tambah Berita</h1>
      <form
        id="form"
        action={handleSaveChanges}
        className="shadow-2xl opacity-50 h-[80vh] w-[95vh] p-10 "
      >
        <div className="flex flex-col mb-3">
          <label className="text-red-700 font-semibold mb-2 ">image :</label>
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

        <div className="flex flex-col mb-3">
          <label htmlFor="title"></label>
          <input
            name="title"
            type="text"
            className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
            placeholder="Judul Berita"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col mb-3">
          <textarea
            name="content"
            required=""
            placeholder="Content"
            className="w-full h-20 px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none  focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex flex-col mb-3">
          <textarea
            name="event"
            required=""
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
    </div>
  );
};
export default berita;
