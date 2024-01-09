"use client"
import BeritaCard from "@/components/Fragments/BeritaCard";
import { useEffect, useRef } from "react";
import { useInView, motion,useAnimation } from 'framer-motion';

function BeritaSection(){
    const refBeritaSec = useRef(null);
    const inView = useInView(refBeritaSec,{once:true})

    const mainControlls = useAnimation();

    useEffect(() => {
        if(inView){
            console.log("ref:",refBeritaSec)
            console.log(inView)
            mainControlls.start("visible");
        }
    }, [inView])

    return(
        <section ref={refBeritaSec} className="snap-always snap-start relative w-full h-screen  p-20">
            <h1 className="text-secondary text-center text-2xl font-bold text-shadow">Berita Terkini</h1>
            <motion.div
            variants={{ 
            hidden:{ opacity:0, y:75},
            visible: { opacity:1, y:0 }
            }}
            initial="hidden"
            animate={mainControlls}
            transition={{ duration: 0.5, delay: 0.25 }}
            >
                <div className="grid grid-cols-2 mt-2">
                    <BeritaCard
                    src="/img/bgHero.jpeg"
                    title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
                    desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
                    />
                    <BeritaCard
                    src="/img/bgHero.jpeg"
                    title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
                    desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
                    />
                    <BeritaCard
                    src="/img/bgHero.jpeg"
                    title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
                    desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
                    />
                    <BeritaCard
                    src="/img/bgHero.jpeg"
                    title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
                    desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
                    />
                    <BeritaCard
                    src="/img/bgHero.jpeg"
                    title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
                    desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
                    />
                    <BeritaCard
                    src="/img/bgHero.jpeg"
                    title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
                    desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
                    />
                </div>      
            </motion.div>
        </section>
    )
};

export default BeritaSection;