"use client"
import Image from 'next/image'
import NavLinks from '@/components/Elements/navlinks'
import Button from '@/components/Elements/Buttons'
import Dropdowns from '@/components/Elements/Dropdown'
import {motion, useInView, useAnimation} from "framer-motion"
import { useEffect, useRef, useState } from 'react'
import 'remixicon/fonts/remixicon.css'


function Navbar({props}){
    const ref = useRef(null);
    const isInView = useInView(ref, { once:true });
    const mainControl = useAnimation();
    const [open,setOpen] = useState(false);

    useEffect(()=> {
        if(isInView){
            mainControl.start("visible")
        }   
    },[isInView])

    

    return(
        <>
        {/* for  */}
        <nav ref={ref} className='z-30 px-5 py-2 w-full fixed top-0 bg-white shadow-md flex justify-between items-center'>
            <a href="/">
                <Image 
                src="/img/Logo.svg"
                width={130}
                height={10}
                alt='logo gereja'
                />
            </a>
            <motion.div
            variants={{ 
                visible:{opacity:1, y:0},
                hidden:{opacity:0, y:-75}
            }}
            initial="hidden"
            animate={mainControl}
            transition={{ duration:0.5, delay:0.50 }}
            >
                <div className='md:flex hidden'>
                    <Dropdowns size="medium" intent="black" modalAbove="false">Profil Gereja</Dropdowns>
                    <NavLinks href="/pages/forum">Forum & Saran</NavLinks>
                    <NavLinks href="/pages/dok">Dokumentasi</NavLinks>
                    <NavLinks href="/pages/tentang">Tentang</NavLinks>
                </div>
            </motion.div>
            <Button href={"/pages/login"} intent="secondary" size="small">Login</Button>
        </nav>

        {/* for mobile */}
        <footer className='md:hidden fixed bottom-0 block w-full py-3 px-2  bg-white z-40 rounded-t-xl'>
            <div className='grid grid-cols-4 h-full'>
                <div className=' flex justify-center items-center h-full w-full text-center'>
                    <div className='w-full text-center'>
                        <Dropdowns size="extraSmall" intent="netral" modalAbove="true">
                            <i className="ri-home-5-fill block text-center ri-xl mb-2 text-slate-500 active:text-secondary"></i>
                            Profil Gereja
                        </Dropdowns>
                    </div>
                </div>
                <div className='flex justify-center items-center h-full w-full text-center'>
                    <NavLinks href="/pages/forum" intent="netral" size="extraSmall">
                        <i className="ri-question-answer-fill block text-center ri-xl mb-2 text-slate-500 active:text-secondary"></i>
                        Forum & Saran
                    </NavLinks>
                </div>
                <div className='flex justify-center items-center h-full w-full text-center'>
                    <NavLinks href="/pages/dok" intent="netral" size="extraSmall">
                        <i className="ri-camera-line block text-center ri-xl mb-2 text-slate-500 active:text-secondary"></i>
                        Dokumentasi
                    </NavLinks>
                </div>
                <div className='flex justify-center items-center h-full w-full text-center'>
                    <NavLinks href="/pages/tentang" intent="netral" size="extraSmall">
                        <i className="ri-question-answer-fill block text-center ri-xl mb-2 text-slate-500 active:text-secondary"></i>
                        Tentang
                    </NavLinks>
                </div>
            </div>
        </footer>
        </>
    )
};

export default Navbar;