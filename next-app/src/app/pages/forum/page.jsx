'use client';
import MainLayout from '@/components/Layouts/MainLayout';
import Footer from '@/components/Fragments/Footer';
import Navbar from '@/components/Fragments/Navbar';
import React, { useState, useEffect } from 'react';
import { post_saran } from '@/app/api/User/saran/route';
import Tanda from '@/app/api/User/route';

export default function saran() {
  const [formData, setfromData] = useState({
    full_name: '',
    email: '',
    message: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setfromData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    simpanSaran(formData);

    setfromData({
      full_name: '',
      email: '',
      message: '',
    });
  };

  async function simpanSaran(dataSaran) {
    try {
      console.log('Data saran yang akan disimpan:', dataSaran);

      const Data = dataSaran;
      console.log('cek data simpanSaran : ', Data);
      console.log('data full name : ', Data.full_name);

      const postData = new FormData();
      postData.append('full_name', Data.full_name);
      postData.append('email', Data.email);
      postData.append('message', Data.message);

      // koneksi ke backend nya
      const res = await post_saran(postData);
      console.log('hasil datanya : ', res);
    } catch (error) {
      console.error('Terjadi kesalahan saat menyimpan saran:', error);
      // tambahkan logika penanganan kesalahan di sini, seperti menampilkan pesan kesalahan kepada pengguna
    }
  }

  // Fetch data saat komponen dimuat
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Tanda();
        console.log('Response Data:', response);
        // Tambahan logika jika diperlukan
        if (res.status === 200) {
          window.location.href = '/pages/forum';
        } else {
          window.location.href = '/pages/login';
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat memuat data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <MainLayout>
      <a className="snap-y snap-mandatory h-screen w-full overflow-y-auto">
        <Navbar />
      </a>
      <div className="max-w-screen-xl mx-auto px-5 mt-[-3rem] ">
        <div className="mt-28 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
            Saran, Kritik Dan Permintaan
          </h1>
          <p className="text-lg mt-4 text-slate-600">Kami siap membantu anda</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 mx-auto max-w-4xl mt-16">
          <h2 className="font-medium text-2xl text-gray-800">
            Contact Gereja ST. Markus Melak
          </h2>
          <p className="text-lg text-slate-500 ">
            Ada yang ingin dikatakan? Kami di sini untuk membantu. Isi formulir
            atau kirim email atau telepon.
          </p>
          <div className="mt-[-2rem]">
            <div className="flex items-center mt-2 space-x-2 text-gray-600">
              <svg
                viewBox="0 0 24 24"
                className="text-gray-400 w-4 h-4"
                astro-icon="uil:map-marker"
              >
                <path
                  fill="currentColor"
                  d="M12 2a8 8 0 0 0-8 8c0 5.4 7.05 11.5 7.35 11.76a1 1 0 0 0 1.3 0C13 21.5 20 15.4 20 10a8 8 0 0 0-8-8zm0 17.65c-2.13-2-6-6.31-6-9.65a6 6 0 0 1 12 0c0 3.34-3.87 7.66-6 9.65zM12 6a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"
                ></path>
              </svg>
              <span>Gereja ST. Markus Melak</span>
            </div>
            <div className="flex items-center mt-2 space-x-2 text-gray-600">
              <svg
                viewBox="0 0 24 24"
                className="text-gray-400 w-4 h-4"
                astro-icon="uil:envelope"
              >
                <path
                  fill="currentColor"
                  d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.41 2-5.88 5.88a1 1 0 0 1-1.42 0L5.41 6zM20 17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7.41l5.88 5.88a3 3 0 0 0 4.24 0L20 7.41z"
                ></path>
              </svg>
              <a href="mailto:parokistmarkusmelak@gmail.com">
                parokistmarkusmelak@gmail.com
              </a>
            </div>

            <div className="flex items-center mt-2 space-x-2 text-gray-600">
              <svg
                viewBox="0 0 24 24"
                className="text-gray-400 w-4 h-4"
                astro-icon="uil:phone"
              >
                <path
                  fill="currentColor"
                  d="M19.44 13c-.22 0-.45-.07-.67-.12a9.44 9.44 0 0 1-1.31-.39 2 2 0 0 0-2.48 1l-.22.45a12.18 12.18 0 0 1-2.66-2 12.18 12.18 0 0 1-2-2.66l.42-.28a2 2 0 0 0 1-2.48 10.33 10.33 0 0 1-.39-1.31c-.05-.22-.09-.45-.12-.68a3 3 0 0 0-3-2.49h-3a3 3 0 0 0-3 3.41 19 19 0 0 0 16.52 16.46h.38a3 3 0 0 0 2-.76 3 3 0 0 0 1-2.25v-3a3 3 0 0 0-2.47-2.9zm.5 6a1 1 0 0 1-.34.75 1.05 1.05 0 0 1-.82.25A17 17 0 0 1 4.07 5.22a1.09 1.09 0 0 1 .25-.82 1 1 0 0 1 .75-.34h3a1 1 0 0 1 1 .79q.06.41.15.81a11.12 11.12 0 0 0 .46 1.55l-1.4.65a1 1 0 0 0-.49 1.33 14.49 14.49 0 0 0 7 7 1 1 0 0 0 .76 0 1 1 0 0 0 .57-.52l.62-1.4a13.69 13.69 0 0 0 1.58.46q.4.09.81.15a1 1 0 0 1 .79 1z"
                ></path>
              </svg>
              <a href="tel:082254605270">0822 5460 5270</a>
            </div>
          </div>

          <form
            id="form"
            action=""
            onSubmit={handleSubmit}
            className="needs-validation"
          >
            <input type="hidden" name="access_key" />
            <input
              type="checkbox"
              className="hidden"
              style={{ display: 'none' }}
              name="botcheck"
            />

            <div className="mb-5">
              <input
                type="text"
                placeholder="Full Name"
                required=""
                name="full_name"
                value={formData.full_name}
                onChange={handleInput}
                className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
              />
              {/* <div className="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
                Please provide your full name.
              </div> */}
            </div>

            <div className="mt-5">
              <label htmlFor="email_address" className="sr-only">
                {' '}
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInput}
                placeholder="Email Address"
                required=""
                className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
              />
            </div>
            {/* <div className="empty-feedback text-red-400 text-sm mt-1">
              {' '}
              Please provide your email address.
            </div>
            <div className="invalid-feedback text-red-400 text-sm mt-1">
              Please provide a valid email address.
            </div> */}

            <div className="mt-5">
              <textarea
                name="message"
                required=""
                placeholder="Your message"
                value={formData.message}
                onChange={handleInput}
                className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none h-36 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
              ></textarea>
              {/* <div className="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
                Please enter your message.
              </div> */}
              <button
                type="submit"
                className=" transition duration-150 ease-in-out  rounded text-center  focus-visible:ring-2 ring-offset-2 ring-gray-200 w-full px-6 py-3 bg-black text-white hover:bg-slate-900  border-2 border-transparent"
              >
                Send Message
              </button>
              <div id="result" className="mt-3 text-center"></div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </MainLayout>
  );
}
