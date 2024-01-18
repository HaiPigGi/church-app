'use client';
import Image from 'next/image';
import NavLinks from '@/components/Elements/navlinks';
import Button from '@/components/Elements/Buttons';
import Dropdowns, { ShowModal } from '@/components/Elements/Dropdown';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import DropDownContextProvider from '@/components/Elements/Dropdown/dropdownContext';

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
            <DropDownContextProvider>
              <Dropdowns size="medium" intent="black" datatestid="profilgereja">
                Profil Gereja
              </Dropdowns>
              <ShowModal modalAbove="false">
                <a
                  href="/pages/pastor"
                  className="relative block text-sm font-light my-2 py-1 after:absolute after:transition-all after:duration-500 after:w-0  after:hover:w-full after:h-full after:left-0 after:border-b-2 after:border-secondary"
                >
                  Pastor Paroki
                </a>
                <a
                  href="/pages/OMK"
                  className="relative block text-sm font-light my-2 py-1 after:absolute after:transition-all after:duration-500 after:w-0  after:hover:w-full after:h-full after:left-0 after:border-b-2 after:border-secondary"
                >
                  Kepengurusan OMK
                </a>
                <a
                  href="/pages/mesdinar"
                  className="relative block text-sm font-light my-2 py-1 after:absolute after:transition-all after:duration-500 after:w-0  after:hover:w-full after:h-full after:left-0 after:border-b-2 after:border-secondary"
                >
                  Kepengurusan Mesdinar
                </a>
              </ShowModal>
            </DropDownContextProvider>

            <NavLinks href="/pages/saran" datatestid="Kritik & Saran">
              Kritik & Saran
            </NavLinks>
            <NavLinks href="/pages/tentang" datatestid="Tentang">
              Tentang
            </NavLinks>
          </div>
        </motion.div>
        {user ? (
          <button type="button">
            welcome,{' '}
            <span className="font-bold text-secondary capitalize">{user}</span>
            <i class="ri-arrow-down-s-fill text-black"></i>
          </button>
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
