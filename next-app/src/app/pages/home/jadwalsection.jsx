"use client"
import { useEffect, useRef } from "react";
import { useInView, motion,useAnimation } from 'framer-motion';

function JadwalMisaSection(){
    const refJadwalSec = useRef(null);
    const inView = useInView(refJadwalSec,{once:true})

    const mainControlls = useAnimation();

    useEffect(() => {
        if(inView){
            console.log("ref:",refJadwalSec)
            console.log(inView)
            mainControlls.start("visible");
        }
    }, [inView])

    return(
        <section  className="snap-always snap-start  bg-transparent w-full h-screen flex justify-center items-center p-10">
          <div className="w-4/5 h-4/5">
            <h1 className="text-secondary text-center text-2xl font-bold text-shadow">Jadwal Misa</h1>
            <div ref={refJadwalSec} className="grid grid-cols-2 gap-10 mt-5 w-full h-full">
              
            {/* Card on left */}
            <motion.div
            variants={{ 
                hiddenLeft:{ opacity:0, x:-80},
                hiddenRight:{ opacity:0,  x:80},
                visible: { opacity:1, x:0 }
            }}
            initial="hiddenLeft"
            animate={mainControlls}
            transition={{ duration: 0.5, delay: 0.25 }}
            >
                <div className="border bg-white h-full border-secondary rounded-sm p-5 shadow-sm shadow-primary">
                    {/* Card Title */}
                    <h1 className="text-xl font-light text-center">Misa Harian</h1>
                    {/* Card Body */}
                    <div className="flex justify-between items-center py-5 border-b border-black">
                    <h3 className="text-primary font-bold">Senin</h3>
                    <p>05:30-Selesai</p>
                    </div>
                    <div className="flex justify-between items-center py-5 border-b border-black">
                    <h3 className="text-primary font-bold">Selasa</h3>
                    <p>05:30-Selesai</p>
                    </div>
                    <div className="flex justify-between items-center py-5 border-b border-black">
                    <h3 className="text-primary font-bold">Rabu</h3>
                    <p>05:30-Selesai</p>
                    </div>
                    <div className="flex justify-between items-center py-5 border-b border-black">
                    <h3 className="text-primary font-bold">Kamis</h3>
                    <p>05:30-Selesai</p>
                    </div>
                    <div className="flex justify-between items-center py-5 border-b border-black">
                    <h3 className="text-primary font-bold">Jumat</h3>
                    <p>05:30-Selesai</p>
                    </div>
                </div>
            </motion.div>

              {/* Card on right */}
              <motion.div
                variants={{ 
                hiddenLeft:{ opacity:0, x:-80},
                hiddenRight:{ opacity:0,  x:80},
                visible: { opacity:1, x:0 }

                }}
                initial="hiddenRight"
                animate={mainControlls}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <div className=" border bg-white h-full border-secondary rounded-sm p-5 shadow-sm shadow-primary">
                    <h1 className="text-xl font-light text-center">Misa Mingguan</h1>
                    {/* Card Body */}
                    <div className="flex justify-between items-center py-5 border-b border-black">
                    <h3 className="text-primary font-bold">Sabtu</h3>
                    <p>17:30-Selesai</p>
                    </div>
                    <div className="flex justify-between items-center py-5 border-b border-black">
                    <h3 className="text-primary font-bold">Minggu</h3>
                    <div className="text-right" >
                        <p className="block">07:30-Selesai</p>
                        <p>17:30-Selesai</p>
                    </div>
                    </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
    )
};

export default JadwalMisaSection;