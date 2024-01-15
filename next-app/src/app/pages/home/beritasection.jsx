"use client"
import BeritaCard from "@/components/Fragments/BeritaCard";
import { useEffect, useRef } from "react";
import { useInView, motion,useAnimation } from 'framer-motion';

const data = {
    id:"1",
    title:"Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya",
    desc:"Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan.",
    imgPath:"/img/bgHero.jpeg"
}

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

    const cardContainerClass = (data) => {
        console.log(data.length)
        if(data.length < 2){
            return "grid grid-cols-1 mt-2 py-5"
        }
        return "grid md:grid-cols-2 grid-cols-1 mt-2 py-5"
    }

    return(
        <section  className="snap-always snap-start bg-berita bg-center bg-no-repeat bg-fixed bg-cover flex justify-center items-center w-full h-screen px-5 pt-16 ">
            <div ref={refBeritaSec} className="h-auto overflow-hidden ">
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
                    <div className={cardContainerClass(data)}>
                        <BeritaCard
                        data={data}
                        />
                    </div>      
                </motion.div>

            </div>
        </section>
    )
};

export default BeritaSection;