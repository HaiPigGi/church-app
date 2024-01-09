"use client"
import Image from 'next/image'
import NavLinks from '@/components/Elements/navlinks'
import Button from '@/components/Elements/Buttons'
import Dropdowns from '@/components/Elements/Dropdown'
import {motion, useInView, useAnimation} from "framer-motion"
import { useEffect, useRef } from 'react'

function Navbar({props}){
    const ref = useRef(null);
    const isInView = useInView(ref, { once:true });
    const mainControl = useAnimation();
    useEffect(()=> {
        if(isInView){
            mainControl.start("visible")
        }   
    },[isInView])
    return(
        <nav ref={ref} className='z-30 px-5 py-2 w-full fixed top-0 bg-white shadow-md flex justify-between items-center'>
            <a href="/">
                <Image 
                src="/img/Logo.svg"
                width={130}
                height={10}
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
                <div className='flex'>
                    <Dropdowns>Profil Gereja</Dropdowns>
                    <NavLinks href="/">Forum & Saran</NavLinks>
                    <NavLinks href="/">Tentang</NavLinks>
                </div>
            </motion.div>
            <Button href={"/pages/login"} intent="secondary" size="small">Login</Button>
        </nav>
    )
};

export default Navbar;