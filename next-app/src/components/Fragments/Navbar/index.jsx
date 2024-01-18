'use client';
import Image from 'next/image';
import NavLinks from '@/components/Elements/navlinks';
import Button from '@/components/Elements/Buttons';
import Dropdowns, { ShowModal } from '@/components/Elements/Dropdown';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import DropDownContextProvider from '@/components/Elements/Dropdown/dropdownContext';
import AuthService from '@/app/lib/Auth/route';

function Navbar({ props }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControl = useAnimation();
  const [user, setUser] = useState('');

  useEffect(() => {
    const userName = sessionStorage.getItem('name');
    setUser(userName);
  }, []);

  useEffect(() => {
    if (isInView) {
      mainControl.start('visible');
    }
  }, [isInView]);

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
                  text: 'Kepengurusan Mesdinar',
                  href: '/pages/mesdinar',
                },
              ]}
            >
              Profil Gereja
            </Dropdowns>

            <NavLinks href="/pages/saran" datatestid="Kritik & Saran">
              Kritik & Saran
            </NavLinks>
            <NavLinks href="/pages/tentang" datatestid="Tentang">
              Tentang
            </NavLinks>
          </div>
        </motion.div>
        {user ? (
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
        ) : (
          <Button href={'/pages/login'} intent="secondary" size="small">
            Login
          </Button>
        )}
      </nav>

      {/* for mobile */}
      <nav className="md:hidden fixed bottom-0 block w-full py-3 px-2  bg-white z-40 rounded-t-xl">
        <div className="grid grid-cols-3 h-full">
          <div className=" flex justify-center items-center h-full w-full text-center">
            <div className="w-full text-center">
              <Dropdowns size="extraSmall" intent="netral" modalAbove="true">
                <i className="ri-home-5-fill block text-center ri-xl mb-2 text-slate-500 active:text-secondary"></i>
                Profil Gereja
              </Dropdowns>
            </div>
          </div>
          <div className="flex justify-center items-center h-full w-full text-center">
            <NavLinks href="/pages/saran" intent="netral" size="extraSmall">
              <i className="ri-question-answer-fill block text-center ri-xl mb-2 text-slate-500 active:text-secondary"></i>
              Kritik & Saran
            </NavLinks>
          </div>
          <div className="flex justify-center items-center h-full w-full text-center">
            <NavLinks href="/pages/tentang" intent="netral" size="extraSmall">
              <i className="ri-team-fill block text-center ri-xl mb-2 text-slate-500 active:text-secondary"></i>
              Tentang
            </NavLinks>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
