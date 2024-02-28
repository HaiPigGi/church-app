'use client';
import BeritaCard from '@/components/Fragments/BeritaCard';
import { useEffect, useRef, useState } from 'react';
import { useInView, motion, useAnimation } from 'framer-motion';
import { get_AllBerita_user } from '@/app/api/routes';
import AuthService from '@/app/api/Auth/route';

function BeritaSection() {
  const refBeritaSec = useRef(null);
  const inView = useInView(refBeritaSec, { once: true });
  const mainControlls = useAnimation();
  const [beritaData, setBeritaData] = useState(null);

  useEffect(() => {
    if (inView) {
      mainControlls.start('visible');
    }
  }, [inView]);

  useEffect(() => {
    get_AllBerita_user();
  }, []);

  async function get_AllBerita_user() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/berita/getAllBerita`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      const responseData = await res.json();
      if (res.status == 200) {
        if (responseData.data == null) {
          setBeritaData(undefined);
          return;
        }
        setBeritaData(responseData.data);
      } else {
        return;
      }
    } catch (e) {
      console.log('error at get_AllBerita_user with message : ', e.message);
    }
  }

  const cardContainerClass = () => {
    if (beritaData.length < 2) {
      return 'grid grid-cols-1';
    }
    return 'grid md:grid-cols-2 grid-cols-1 ';
  };

  return (
    <section className="snap-always snap-start overflow-hidden bg-berita bg-center bg-no-repeat bg-fixed bg-cover flex justify-center items-center w-full h-screen px-5 pt-16 ">
      <div ref={refBeritaSec} className=" overflow-hidden w-full h-full ">
        <h1 className="text-secondary text-center text-2xl font-bold text-shadow ">
          Berita Terkini
        </h1>
        <div className="overflow-y-auto w-full h-4/5 px-5 mt-2 py-5 ">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={mainControlls}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="h-full overflow-y-auto"
          >
            {beritaData ? (
              <div
                className={
                  beritaData.length < 2
                    ? 'grid grid-cols-1'
                    : 'grid md:grid-cols-2 grid-cols-1'
                }
              >
                {beritaData.map((dat) => {
                  return <BeritaCard data={dat} />;
                })}
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <h1 className="text-secondary text-2xl font-semibold text-center">
                  Belum ada berita
                </h1>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default BeritaSection;
