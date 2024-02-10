'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, motion, useAnimation } from 'framer-motion';
import { get_jadwal } from '@/app/api/User/jadwalmisa/route';

function JadwalMisaSection() {
  const refJadwalSec = useRef(null);
  const inView = useInView(refJadwalSec, { once: false });

  const [Jadwal,setJadwal] = useState([])

  useEffect(()=>{
    async function fetchData(){
      try{
        const res = await get_jadwal();
        console.log('hasilnya : ',res);
        setJadwal(res.data)
      }catch{

      }
    }
    fetchData();
  },[])

  const mainControlls = useAnimation();

  useEffect(() => {
    if (inView) {
      mainControlls.start('visible');
    }
  }, [inView]);

  return (
    <section className="snap-always snap-center w-full h-screen flex justify-center items-center px-5 py-5 overflow-hidden bg-fixed bg-jadwalMisa bg-no-repeat bg-cover bg-center">
      <div className="w-full max-w-2xl mt-10">
        <h1 className="text-secondary text-center text-2xl font-bold text-shadow ">
          Jadwal Misa
        </h1>
        <div className="w-full h-full mt-5 flex flex-col justify-center items-center">
          <div
            ref={refJadwalSec}
            className="md:flex w-full h-full justify-center items-center mx-auto gap-10 px-5"
          >
            {/* Card on right */}
            <motion.div
              variants={{
                hiddenLeft: { opacity: 0, x: -80 },
                hiddenRight: { opacity: 0, x: 80 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hiddenRight"
              animate={mainControlls}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="rounded-md flex justify-center md:justify-start items-center w-full h-full "
            >
      
              {Jadwal?.length > 0 && (
                <div className="border ml-16 bg-white w-full md:max-h-[400px] min-w-[300px] md:min-h-[400px] md:min-w-[350px] max-w-[500px] h-full border-secondary rounded-sm p-5 shadow-sm shadow-primary">
                  <h1 className="text-xl font-light text-center mt-[-0.5rem]">
                    Jadwal Dalam Seminggu
                  </h1>
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Hari</th>
                      <th className="py-2 px-4 border-b">Jenis Misa</th>
                      <th className="py-2 px-4 border-b">Waktu Mulai</th>
                      <th className="py-2 px-4 border-b">Waktu selesai</th>
                    </tr>
                  </thead>
                  {Jadwal?.map((row, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-black">
                      <h3 className="text-primary font-bold ml-3">{row.hari}</h3>
                      <h3 className=''>{row.jenis}</h3>
                      <p className='mr-10 ml-[-3rem]'>{row.waktu_mulai}</p>
                      <p className='mr-10 ml-[-3rem]'>{row.waktu_selesai}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JadwalMisaSection;
