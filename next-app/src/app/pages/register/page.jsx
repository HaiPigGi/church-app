'use client';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import MainLayout from '@/components/Layouts/MainLayout/index';
import Modal from '@/components/Fragments/Modal';
import 'remixicon/fonts/remixicon.css';
import AuthService from '@/app/api/Auth/route';

export default function Register() {
  const [dataRegis, setDataRegis] = useState({
    name: '',
    password: '',
    password_confirmation: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setDataRegis((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const clsSection = (openModal) => {
    if (openModal == true) {
      return 'blur-sm h-screen w-full  grid md:grid-cols-5';
    }
    return ' h-screen w-full grid grid-cols-1 px-2 md:px-0 pt-18 md:grid-cols-6 overflow-y-auto pb-16 md:overflow-hidden lg:grid-cols-5';
  };

  const handleClickRegis = async () => {
    setErrorMessage('');
    if (dataRegis.password !== dataRegis.password_confirmation) {
      setErrorMessage('Username dan Password tidak sama');
      return;
    }
    const res = await AuthService().Sign_up(dataRegis);
    if (res.status == 201) {
      setModalContent(
        <>
          <div className="flex justify-center items-center w-full h-24 text-green-500 animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width=""
              height="full"
              fill="currentColor"
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
            </svg>
          </div>
          <h1 className="text-center my-2 text-2xl font-bold text-green-500">
            Registrasi Berhasil
          </h1>
          <p className="text-center my-2 text-md w-3/4 font-light mx-auto text-slate-400">
            Selanjutnya anda akan diarahkan ke login
          </p>
        </>,
      );
      return;
    }
    setErrorMessage(res.message);
    return;
  };

  return (
    <MainLayout>
      <section className={clsSection(openModal)}>
        <div className="rounded-md md:rounded-none bg-hero bg-center bg-cover bg-no-repeat flex justify-center items-center md:w-full h-auto md:h-screen col-span-1 md:col-span-3">
          <div id="content-Hero">
            <h1 className="text-2xl md:text-4xl text-shadow font-bold text-white text-center">
              Gereja <span className="block text-white">ST. Markus Melak</span>
            </h1>
            <p className="text-center text-white font-light text-[12px]  mx-auto text-pretty md:text-sm text-shadow my-2">
              Temukan lebih banyak tentang komunitas gereja kami <br />
              dengan login sekarang untuk eksplorasi lengkap
            </p>
          </div>
        </div>

        <div className="mt-2 md:mt-0 col-span-1 md:col-span-3 lg:col-span-2 bg-white shadow-md overflow-hidden w-full h-full">
          <section className="bg-white w-full h-full">
            <div className="flex items-center justify-center w-full h-full px-2 sm:px-5 ">
              <div className="w-full h-auto bg-white rounded-lg shadow-md dark:border md:mt-0 max-w-md xl:p-0  ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-yellow-800 md:text-2xl ">Sign in to your account</h1> */}
                  <h1 className=" font-bold text-2xl text-primary">REGISTER</h1>
                  {errorMessage != '' ? (
                    <h1 className="text-red-500 font-semibold font-xl ">
                      {errorMessage}
                    </h1>
                  ) : (
                    ''
                  )}
                  <form
                    className="space-y-4 md:space-y-6"
                    action={handleClickRegis}
                    method="POST"
                  >
                    <div className="mt-[-1rem]">
                      <label className="block mb-1 text-sm font-medium text-primary ">
                        Username
                      </label>
                      <input
                        name="name"
                        type="text"
                        onChange={handleChanges}
                        className="bg-gray-50 border border-yellow-800 text-primary  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
                        placeholder="Masukan Nama Anda"
                        required
                      />
                    </div>
                    <div className="">
                      <label className="block mb-1 text-sm font-medium text-primary ">
                        Password
                      </label>
                      <input
                        name="password"
                        type="password"
                        onChange={handleChanges}
                        className="bg-gray-50 border border-yellow-800 text-primary  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
                        placeholder="Masukan Password Anda"
                        required
                      />
                    </div>
                    <div className="">
                      <label className="block mb-1 text-sm font-medium text-primary ">
                        Konfirmasi Password
                      </label>
                      <input
                        name="password_confirmation"
                        type="password"
                        onChange={handleChanges}
                        className="bg-gray-50 border border-yellow-800 text-primary  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 "
                        placeholder="Masukan Ulang Password Anda"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-primary focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Register
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      already have an account?{' '}
                      <a
                        href="/pages/login"
                        className="font-medium hover:underline text-primary"
                      >
                        Sign in
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      {openModal ? <Modal action={handleModal} type="success"></Modal> : ''}
    </MainLayout>
  );
}
