'use client'
import { useState } from 'react';
import route from '@/app/api/Admin/berita/routes'


const berita = () => {

    const initialFormData = {
        image: '',
        title: '',
        content: '',
        event: ''
      };

      const handleCancel = () => {
        // Reset form
        setFormData(initialFormData);
      };
  return (
   <div className="pt-10 flex flex-col items-center justify-center h-auto w-auto">
        <h1 className="font-bold text-3xl mb-2">Tambah Berita</h1>
        <div className="shadow-2xl opacity-50 h-[80vh] w-[95vh] p-10 ">

            <div className="flex flex-col mb-3">
                <label className="text-red-700 font-semibold mb-2 ">image :</label>
                <input 
                name='image'
                type="file"
                className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
                placeholder="Images" />
            </div>
            
            <div className="flex flex-col mb-3">
                <input 
                name='title'
                type="text"
                className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
                placeholder="Judul Berita" />
            </div>

            <div className="flex flex-col mb-3">
                    <textarea
                    name="content"
                    required=""
                    placeholder="Content"
                    className="w-full h-20 px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none  focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100">
                    </textarea>
            </div>

            <div className="flex flex-col mb-3">
                <input 
                name='event'
                type="Event"
                className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
                placeholder="Judul Berita" />
            </div>

            <div>
                <button
                    name='created_at'
                    className="border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200">
                        Save changes
                </button>
                <button
                    name='updated_at'
                    className="border-2 ml-[4rem] border-green-600 rounded-lg px-3 py-2 text-green-400 cursor-pointer hover:bg-green-600 hover:text-green-200">
                        Update
                </button>
                <button
                    name='deleted_at'
                    onClick={handleCancel}
                    className=" border-2 ml-[5rem] border-red-600 rounded-lg px-3 py-2 text-red-400 cursor-pointer hover:bg-red-600 hover:text-red-200">
                        Batal
                </button>
            </div>
        </div>
   </div>
  );
};
export default berita;
