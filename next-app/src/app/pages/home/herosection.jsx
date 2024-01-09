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
        <section id="sectionHero" ref={refHeroSec} className="snap-always snap-start relative w-full h-screen flex justify-center items-center">
          <motion.div
          variants={{ 
            hidden:{ opacity:0, y:75},
            visible: { opacity:1, y:0 }
           }}
           initial="hidden"
           animate={mainControlls}
        //    exit="hidden"
           transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div id="content-Hero" className="">
                <h1 className="text-4xl text-shadow font-bold text-white text-center">Gereja <span className="block text-secondary">ST. Markus Melak</span></h1>
                <p className="text-center text-white font-light text-sm text-shadow my-2">Temukan lebih banyak tentang komunitas gereja kami <br/>dengan login sekarang untuk eksplorasi lengkap</p>
                <Button href={"/pages/login"} intent="secondary" size="small" className="shadow-xl  mx-auto">LOGIN</Button>
            </div>
          </motion.div>
        </section>
    )
};

export default HeroSection;