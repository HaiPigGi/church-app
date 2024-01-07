import { cva } from "class-variance-authority";
import Image from 'next/image'
import NavLinks from '@/components/Elements/navlinks'
import Button from '@/components/Elements/Buttons'
import Dropdowns from '@/components/Elements/Dropdown'

function Navbar({props}){
    return(
        <nav className='z-30 px-5 py-2 w-full fixed top-0 bg-white shadow-md flex justify-between items-center'>
            <a href="/">
                <Image 
                src="/img/Logo.svg"
                width={130}
                height={10}
                />
            </a>
            <div className='flex'>
                <Dropdowns>Profil Gereja</Dropdowns>
                <NavLinks href="/">Forum & Saran</NavLinks>
                <NavLinks href="/">Tentang</NavLinks>
            </div>
            <Button intent="secondary" size="small">Login</Button>
        </nav>
    )
};

export default Navbar;