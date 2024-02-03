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

export default function Login() {
  const [dataLogin, setDataLogin] = useState({
    name: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
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
    setModalContent(
      <Modal
        action={() => handleModal(res.role)}
        type="success"
        message={res.message}
      />,
    );
  };

  const handleClickLogin = async () => {
    setErrorMessage('');
    const res = await AuthService().Sign_in(dataLogin);
    console.log(res);
    if (isResponseError(res)) return;
    storeSessionData(res);
    showValidationModal(res);
    return;
  };

  const isAdmin = (role) => {
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
      return 'blur-sm h-screen w-full bg-hero bg-fixed bg-center bg-cover bg-no-repeat overflow-hidden';
    }
    return 'h-screen w-full bg-hero bg-fixed bg-center bg-cover bg-no-repeat overflow-hidden';
  };

  return (
    <MainLayout>
      <Navbar />
      <section className={clsSection()}>
        <div className="snap-always snap-start w-full h-screen absolute flex justify-center items-center right-[15rem]">
          <div id="content-Hero" className="">
            <h1 className="text-4xl text-shadow font-bold text-white text-center">
              Gereja <span className="block text-white">ST. Markus Melak</span>
            </h1>
            <p className="text-center text-white font-light text-sm text-shadow my-2">
              Temukan lebih banyak tentang komunitas gereja kami <br />
              dengan login sekarang untuk eksplorasi lengkap
            </p>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md overflow-hidden w-[35rem] h-[100vh] fixed top-0 pt-2 right-0">
          <section className="bg-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-20">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0  sm:max-w-md xl:p-0 min-[360px]:max-[555px]:w-[22rem] min-[360px]:max-[555px]:ml-[12.5rem]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-yellow-800 md:text-2xl ">
                    Sign in to your account
                  </h1>
                  {errorMessage != '' ? (
                    <h1 className="text-red-500 font-semibold font-xl">
                      {errorMessage}
                    </h1>
                  ) : (
                    ''
                  )}
                  <form
                    className="space-y-4 md:space-y-6"
                    action={handleClickLogin}
                  >
                    <div>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        className="bg-gray-50 border border-yellow-800 text-primary rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :placeholder-gray-400 min-[360px]:max-[555px]:w-72"
                        placeholder="username"
                        required
                      />
                    </div>
                    <div>
                      <input
                        name="password"
                        type="password"
                        className="bg-gray-50 border mb-2 border-yellow-800 text-primary rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :placeholder-gray-400 min-[360px]:max-[555px]:w-72"
                        placeholder="password"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 mt-3 "
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-primary focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  min-[360px]:max-[555px]:w-72"
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
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <div>{modalContent}</div>
    </MainLayout>
  );
}
