'use client';
import MainLayout from '@/components/Layouts/MainLayout/index';
import { useState } from 'react';
import Navbar from '@/components/Fragments/Navbar';
import AuthService from '@/app/api/Auth/route.jsx';
import Modal from '@/components/Fragments/Modal';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData, setSession } from '@/lib/features/session/sessionSlice';
import { useAppDispatch } from '@/lib/hook';
import LoadingBounce from '@/components/Fragments/Loading/LoadingBounce';
import useModalContent from '@/lib/customHooks/useModalContent';

export default function Login() {
  const [dataLogin, setDataLogin] = useState({
    name: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { modalContent, setModalContent, clearState } = useModalContent();
  const dispatch = useAppDispatch();
  const status = useSelector((state) => state.session.status);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isResponseError = (res) => {
    if (res?.error) {
      setErrorMessage(res.error);
      setOpenModal(false);
      return true;
    }
    return false;
  };

  const storeSessionData = (res) => {
    dispatch(
      setSession({
        message: res.message,
        user: {
          name: res.name,
          status: res.status,
        },
        error: null,
      }),
    );
  };

  const showValidationModal = (res) => {
    setOpenModal(true);
    setModalContent('validation', {
      action: () => {
        handleModal(res.role);
        setOpenModal(false);
      },
      typeMessage: 'success',
      message: res.message,
    });
  };

  const handleClickLogin = async () => {
    setModalContent('loading');
    setErrorMessage('');
    const res = await AuthService().Sign_in(dataLogin);
    if (isResponseError(res, setModalContent, clearState)) return;
    storeSessionData(res);
    showValidationModal(res);
    return;
  };

  const isAdmin = (role) => {
    console.log();
    if (role == 1) {
      return '/pages/admin';
    }
    return '/';
  };

  const handleModal = (role) => {
    setOpenModal(!openModal);
    window.location.href = isAdmin(role);
  };

  const clsSection = () => {
    if (openModal == true) {
      return 'blur-sm h-screen w-full overflow-hidden grid md:grid-cols-3 grid-row-4 p-2 md:p-0 overflow-hidden';
    }
    return 'h-screen w-full overflow-hidden grid md:grid-cols-3 grid-row-4 p-2 md:p-0';
  };

  return (
    <MainLayout>
      <Navbar />
      <section className={clsSection()}>
        <div className="w-full row-span-2 md:col-span-2 md:h-screen h-full relative flex justify-center items-center">
          <div id="content-Hero" className="absolute z-20">
            <h1 className="text-2xl md:text-4xl text-shadow font-bold text-white text-center">
              Gereja <span className="block text-white">ST. Markus Melak</span>
            </h1>
            <p className="text-center w-80 text-white font-light text-sm text-shadow my-2">
              Temukan lebih banyak tentang komunitas gereja kami dengan login
              sekarang untuk eksplorasi lengkap
            </p>
          </div>
          <div className="absolute w-full h-full left-0 top-0 bg-hero bg-center bg-cover bg-no-repeat rounded-xl md:rounded-none"></div>
        </div>

        <div className="row-span-1 md:col-span-1 bg-white relative p-4 shadow-md w-full h-full md:h-screen flex items-start md:items-center">
          <section className=" w-full ">
            <div className="flex items-center justify-center  mx-auto w-full h-full">
              <form
                className="w-full bg-white rounded-lg shadow dark:border md:mt-0  "
                action={() => {
                  setOpenModal(true);
                  setModalContent(
                    <Modal type="loading" content={<LoadingBounce />} />,
                  );
                  handleClickLogin();
                }}
                method="post"
              >
                <div className="p-6 space-y-4 md:space-y-6  w-full">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-yellow-800 md:text-2xl w-full">
                    Sign in to your account
                  </h1>
                  {errorMessage != '' ? (
                    <h1 className="text-red-500 font-semibold font-xl">
                      {errorMessage}
                    </h1>
                  ) : (
                    ''
                  )}
                  <div className="space-y-4 md:space-y-6 w-full ">
                    <div className="w-full relative">
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        className="peer h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5  border-blue-gray-200 focus:border-gray-900 bg-gray-5 border-yellow-800 text-primary rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :placeholder-gray-400"
                        placeholder=""
                        required
                      />
                      <label class='flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate text-blue-gray-500 leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[" "] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[" "] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900'>
                        Username
                      </label>
                    </div>
                    <div className="w-full relative">
                      <input
                        name="password"
                        type="password"
                        className="peer h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5  border-blue-gray-200 focus:border-gray-900 bg-gray-5 border-yellow-800 text-primary rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :placeholder-gray-400"
                        placeholder=""
                        onChange={handleChange}
                        required
                      />
                      <label class='flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate text-blue-gray-500 leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[" "] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[" "] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900'>
                        Password
                      </label>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 mt-3 "
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-primary focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                    >
                      Login
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet?{' '}
                      <a
                        href="/pages/register"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </section>
      <div>{modalContent}</div>
    </MainLayout>
  );
}
