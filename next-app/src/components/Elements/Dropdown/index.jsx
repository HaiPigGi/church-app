"use client"
import Image from "next/image";
import { useState } from "react";
import { cva } from "class-variance-authority";

const clsDropdown = cva(["relative h-full after:absolute after:transition-all after:duration-500 after:w-0  after:hover:w-full after:h-[110%] after:left-0 after:border-b-2 after:border-secondary"],{
    variants:{
        intent:{
            primary:"text-primary",
            secondary:"text-secondary",
            black:"text-black",
            netral:"text-slate-500"
        },
        size:{
            extraSmall:"text-xs",
            small:"text-sm",
            medium:"text-base",
            large:"text-lg",
            extraLarge:"text-xl"
        }
    }
})

const clsModal = cva(["absolute transition duration-500  shadow-md text-left border-secondary bg-white rounded-md p-2"],{
    variants:{
        above:{
            true:"bottom-full w-52 mb-2 border-b-4",
            false:"top-full w-52 mt-3 border-t-4"
        }
    }
}) 
const ShowModal = ({above}) => {
    return(
        <div className={clsModal({above})}>
            <a href="/pages/pastor" className="relative block text-sm font-light my-2 py-1 after:absolute after:transition-all after:duration-500 after:w-0  after:hover:w-full after:h-full after:left-0 after:border-b-2 after:border-secondary">Pastor Paroki</a>
            <a href="/pages/OMK" className="relative block text-sm font-light my-2 py-1 after:absolute after:transition-all after:duration-500 after:w-0  after:hover:w-full after:h-full after:left-0 after:border-b-2 after:border-secondary">Kepengurusan OMK</a>
            <a href="/pages/mesdinar" className="relative block text-sm font-light my-2 py-1 after:absolute after:transition-all after:duration-500 after:w-0  after:hover:w-full after:h-full after:left-0 after:border-b-2 after:border-secondary">Kepengurusan Mesdinar</a>
        </div>
    )
}

function Dropdowns({children, size, intent, modalAbove}){
    const [open, setOpen] = useState(false);

    return(
        <div className="relative">
            <button 
            className={clsDropdown({size,intent })}
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
                className="inline-block ms-1 rotate-180 md:rotate-0 md:opacity-100 opacity-[0.40]"
                />
            </button>
            {open == true ? <ShowModal above={modalAbove}/> : <></>}

        </div>
    )
};

export default Dropdowns;
