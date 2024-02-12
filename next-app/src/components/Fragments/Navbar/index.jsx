'use client';
import Image from 'next/image';
import NavLinks from '@/components/Elements/navlinks';
import Button from '@/components/Elements/Buttons';
import Dropdowns, { ShowModal } from '@/components/Elements/Dropdown';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import AuthService from '@/app/api/Auth/route';
import { useAppSelector, useAppDispatch } from '@/lib/hook';
import useModalContent from '@/lib/customHooks/useModalContent';

function Navbar({ props }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControl = useAnimation();
  const [user, setUser] = useState('');
  // to get the status from redux store
  const status = useAppSelector((state) => state.session.status);
  // to get user from status
  const userData = useAppSelector((state) => state.session.user);
  // userData value must be {
  //  user : "{'message','user:{name,status}}''",
  //  status : "{'status : string'",
  //  error: "string"
  // }
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Gunakan hook useModalContent
  const { modalContent, clearState, setModalContent } = useModalContent();

  useEffect(() => {
    if (isInView) {
      mainControl.start('visible');
    }
  }, [isInView]);

  const RenderBasedStatus = () => {
    if (status == 'succeeded') {
      setUser(userData.user.name);
      return (
        <Dropdowns
          size="medium"
          intent="black"
          modalAbove={false}
          modalPosition="toRight"
          dataModal={[
            {
              text: 'Log out',
              href: '#',
              action: AuthService().Logout,
            },
          ]}
        >
          welcome,{' '}
          <span className="font-bold text-secondary capitalize">{user}</span>
        </Dropdowns>
      );
    }
    return (
      <Button href={'/pages/login'} intent="secondary" size="small">
        Login
      </Button>
    );
  };

  useEffect(() => {
    RenderBasedStatus();
  }, [status, RenderBasedStatus]);

  return (
    <>
      {/* for PC*/}
      <nav
        ref={ref}
        className="z-30 px-5 py-2 w-full sticky top-0 bg-white shadow-md flex justify-between items-center"
      >
        <a href="/">
          <Image
            src="/img/Logo.svg"
            width={130}
            height={10}
            alt="logo gereja"
            data-testid="logo gereja"
          />
        </a>
        <motion.div
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -75 },
          }}
          initial="hidden"
          animate={mainControl}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="md:flex hidden">
            <Dropdowns
              size="medium"
              intent="black"
              datatestid="profilgereja"
              modalAbove={false}
              dataModal={[
                {
                  text: 'Pasor Paroki',
                  href: '/pages/pastor',
                },
                {
                  text: 'Kepungurasan OMK',
                  href: '/pages/OMK',
                },
                {
                  text: 'Kepengurusan Misdinar',
                  href: '/pages/mesdinar',
                },
                {
                  text: 'Kepengurusan DPP',
                  href: '/pages/DPP',
                },
                {
                  text: 'Panitia Kegiatan',
                  href: '/pages/panitia',
                },
              ]}
            >
              Profil Gereja
            </Dropdowns>

            <NavLinks href="/pages/forum" datatestid="Kritik & Saran">
              Kritik & Saran
            </NavLinks>

            <NavLinks href="/pages/dok" datatestid="Dokumentasi">
              Dokumentasi
            </NavLinks>

            <NavLinks href="/pages/tentang" datatestid="Tentang">
              Tentang
            </NavLinks>
          </div>
        </motion.div>
        <RenderBasedStatus />
      </nav>

      {/* for mobile */}
      <nav className="md:hidden fixed bottom-0 block w-full py-3 px-2  bg-white z-40 rounded-t-xl">
        <div className="grid grid-cols-4 h-full">
          <div className=" flex justify-center items-center h-full w-full text-center">
            <div className="w-full text-center">
              <Dropdowns
                size="extraSmall"
                intent="netral"
                modalAbove="true"
                datatestid="profilgereja"
                dataModal={[
                  {
                    text: 'Pasor Paroki',
                    href: '/pages/pastor',
                  },
                  {
                    text: 'Kepungurasan OMK',
                    href: '/pages/OMK',
                  },
                  {
                    text: 'Kepengurusan Mesdinar',
                    href: '/pages/mesdinar',
                  },
                  {
                    text: 'Panitia Kegiatan',
                    href: '/pages/panitia',
                  },
                ]}
              >
                <i className="ri-home-5-fill block text-center ri-xl mb-2 text-slate-500 active:text-secondary"></i>
                Profil Gereja
              </Dropdowns>
            </div>
          </div>
          <div className="flex justify-center items-center h-full w-full text-center">
            <NavLinks href="/pages/forum" intent="netral" size="extraSmall">
              <i className="ri-question-answer-fill block text-center ri-xl mb-2 text-slate-500 active:text-secondary"></i>
              Kritik & Saran
            </NavLinks>
          </div>
          <div className="flex justify-center items-center h-full w-full text-center">
            <NavLinks href="/pages/dok" intent="netral" size="extraSmall">
              <i className="ri-camera-line block text-center ri-xl mb-2 text-slate-500 active:text-secondary"></i>
              Dokumentasi
            </NavLinks>
          </div>
          <div className="flex justify-center items-center h-full w-full text-center">
            <NavLinks href="/pages/tentang" intent="netral" size="extraSmall">
              <i className="ri-question-answer-fill block text-center ri-xl mb-2 text-slate-500 active:text-secondary"></i>
              Tentang
            </NavLinks>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
