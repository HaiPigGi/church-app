"use client"
import Button from "@/components/Elements/Buttons";
import { useEffect, useRef } from "react";
import { useInView, motion,useAnimation } from 'framer-motion';



function HeroSection(){
    const refHeroSec = useRef(null);
    const inView = useInView(refHeroSec, {once:true})

    const mainControlls = useAnimation();
    useEffect(() => {
        if(inView){
            console.log("inView", inView);
            mainControlls.start("visible");
        }
    }, [inView])

    return(
        <section id="sectionHero" ref={refHeroSec} className="snap-always snap-start relative w-full h-screen flex justify-center items-center px-5">
          <motion.div
          variants={{ 
            hidden:{ opacity:0, y:75},
            visible: { opacity:1, y:0 }
           }}
           initial="hidden"
           animate={mainControlls}
           transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div id="content-Hero" className="">
                <h1 className="md:text-4xl text-2xl text-shadow font-bold text-white text-center">Gereja <span className="block text-secondary">ST. Markus Melak</span></h1>
                <p className="md:w-96 text-center text-white font-light md:text-sm text-xs text-pretty text-shadow my-2 mx-2">Temukan lebih banyak tentang komunitas gereja kami dengan login sekarang untuk eksplorasi lengkap</p>
                <Button href={"/pages/login"} intent="secondary" size="small" className="shadow-xl  mx-auto hidden md:block">LOGIN</Button>
                <Button href={"/pages/login"} intent="secondary" size="extraSmall" className="shadow-xl  mx-auto md:hidden">LOGIN</Button>
            </div>
          </motion.div>
        </section>
    )
};

export default HeroSection;