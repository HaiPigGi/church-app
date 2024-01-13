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
        <section  className=" w-full h-screen p-5 ">
            <div ref={refBeritaSec} className="h-full overflow-hidden ">
                <h1 className="text-secondary text-center text-2xl font-bold text-shadow ">Berita Terkini</h1>
                <motion.div
                variants={{ 
                hidden:{ opacity:0, y:75},
                visible: { opacity:1, y:0 }
                }}
                initial="hidden"
                animate={mainControlls}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="h-full overflow-y-auto"
                >
                    <div className="grid md:grid-cols-2 grid-cols-1 mt-2 py-5">
                        <BeritaCard
                        href="/pages/berita/1"
                        src="/img/bgHero.jpeg"
                        title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
                        desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
                        />
                        <BeritaCard
                        href="/pages/berita/2"
                        src="/img/bgHero.jpeg"
                        title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
                        desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
                        />
                        <BeritaCard
                        href="/pages/berita/3"
                        src="/img/bgHero.jpeg"
                        title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
                        desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
                        />
                        <BeritaCard
                        href="/pages/berita/4"
                        src="/img/bgHero.jpeg"
                        title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
                        desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
                        />
                        <BeritaCard
                        href="/pages/berita/5"
                        src="/img/bgHero.jpeg"
                        title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
                        desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
                        />
                        <BeritaCard
                        href="/pages/berita/6"
                        src="/img/bgHero.jpeg"
                        title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
                        desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
                        />
                    </div>      
                </motion.div>

            </div>
        </section>
    )
};

export default BeritaSection;