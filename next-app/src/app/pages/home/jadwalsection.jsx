'use client';
import { useEffect, useRef } from 'react';
import { useInView, motion, useAnimation } from 'framer-motion';

function JadwalMisaSection() {
  const refJadwalSec = useRef(null);
  const inView = useInView(refJadwalSec, { once: false });

  const mainControlls = useAnimation();

  useEffect(() => {
    if (inView) {
      mainControlls.start('visible');
    }
  }, [inView]);

  return (
    <section className="snap-always snap-center w-full h-screen flex justify-center items-center px-5 py-5 overflow-hidden bg-fixed bg-jadwalMisa bg-no-repeat bg-cover bg-center">
      <div className="w-full">
        <h1 className="text-secondary text-center text-2xl font-bold text-shadow ">
          Jadwal Misa
        </h1>
        <div className="w-full h-full mt-5">
          <div
            ref={refJadwalSec}
            className="md:flex w-full h-full justify-center items-center mx-auto gap-10 px-5"
          >
            <motion.div
              variants={{
                hiddenLeft: { opacity: 0, x: -80 },
                hiddenRight: { opacity: 0, x: 80 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hiddenLeft"
              animate={mainControlls}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex justify-center md:justify-end md:mb-0 mb-5 w-full"
            >
              <div className="border  bg-white w-full max-h-[400px] min-w-[300px] md:min-w-[350px] max-w-[500px]  h-full border-secondary rounded-sm p-5  shadow-sm shadow-primary">
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
                hiddenLeft: { opacity: 0, x: -80 },
                hiddenRight: { opacity: 0, x: 80 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hiddenRight"
              animate={mainControlls}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="rounded-md flex justify-center md:justify-start items-center w-full h-full "
            >
              <div className=" border  bg-white w-full md:max-h-[400px] min-w-[300px]  md:min-h-[400px]  md:min-w-[350px] max-w-[500px]  h-full border-secondary rounded-sm p-5  shadow-sm shadow-primary">
                <h1 className="text-xl font-light text-center">
                  Misa Mingguan
                </h1>
                {/* Card Body */}
                <div className="flex justify-between items-center py-5 border-b border-black">
                  <h3 className="text-primary font-bold">Sabtu</h3>
                  <p>17:30-Selesai</p>
                </div>
                <div className="flex justify-between items-center py-5 border-b border-black">
                  <h3 className="text-primary font-bold">Minggu</h3>
                  <div className="text-right">
                    <p className="block">07:30-Selesai</p>
                    <p>17:30-Selesai</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card on left */}
        </div>
      </div>
    </section>
  );
}

export default JadwalMisaSection;
