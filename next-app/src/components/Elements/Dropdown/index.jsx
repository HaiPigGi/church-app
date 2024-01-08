"use client"
import Image from "next/image";
import { useState } from "react";
import { cva } from "class-variance-authority";


const ShowModal = (clsModal) => {
    return(
        <div className="absolute transition duration-500 top-full mt-2 border-t-2 shadow-md border-secondary w-52 bg-white rounded-sm p-2">
            <a href="/pages/pastor" className="block text-sm font-light py-2">Pastor Paroki</a>
            <a href="/pages/OMK" className="block text-sm font-light py-2">Kepengurusan OMK</a>
            <a href="/pages/mesdinar" className="block text-sm font-light py-2">Kepengurusan Mesdinar</a>
        </div>
    )
}

function Dropdowns({children}){
    const [open, setOpen] = useState(false);

    return(
        <div className="relative">
            <button 
            className="text-md mx-2 relative after:absolute after:transition-all after:duration-500 after:w-0  after:hover:w-full after:h-[110%] after:left-0 after:border-b-2 after:border-secondary"
            onClick={() => {
                setOpen(!open);
            }}
            >
                {children}
                <Image
                src="/img/arrowDropdown.svg"
                width={10}
                height={10}
                alt="arrow"
                className="inline-block ms-1"
                />
            </button>
            {open == true ? <ShowModal/> : <></>}

        </div>
    )
};

export default Dropdowns;
