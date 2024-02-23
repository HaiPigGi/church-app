'use client';
import { get_BeritaBasedID_user } from '@/app/api/routes';
import BeritaLayout from '@/components/Layouts/BeritaLayout';
import Image from 'next/image';
import { useEffect, useState, Suspense } from 'react';
import Loading from '@/components/Fragments/Loading/loading';
import useModalContent from '@/lib/customHooks/useModalContent';

function BeritaPage({ params }) {
  // use params.beritaid to get the berita ID
  const [beritaDat, setBeritaDat] = useState();
  const [loading, setLoading] = useState(true);
  const { clearState, modalContent, setModalContent } = useModalContent();

  useEffect(() => {
    async function getData() {
      const res = await get_BeritaBasedID_user(params.beritaid);
      setBeritaDat(res.datas);
      setLoading(false);
      console.log(res);
    }
    getData();
  }, []);

  const showImage = (image) => {
    setModalContent('show', {
      content: (
        <Image
          src={image.url}
          fill={true}
          alt="Gambar"
          className="object-contain"
        />
      ),
      action: clearState,
    });
  };

  return (
    <BeritaLayout>
      <Suspense fallback={<Loading />}>
        {/* image container */}
        <section className=" md:static md:col-span-3  w-full h-full px-5 py-5 md:px-14 overflow-y-auto">
          {loading ? (
            <Loading />
          ) : beritaDat ? (
            <>
              <button
                className="relative w-full h-52 rounded-xl overflow-hidden transition duration-500 hover:translate-x-2 hover:translate-y-2"
                onClick={() => showImage(beritaDat.image)}
              >
                <Image
                  src={beritaDat.image.url}
                  fill={true}
                  alt="deskripsi"
                  className="object-cover"
                />
              </button>
              <article className="px-4 mt-8">
                <h1 className="text-2xl text-pretty font-bold">
                  {beritaDat.title}
                </h1>
                <p className="mt-5 text-pretty">{beritaDat.content}</p>
              </article>
            </>
          ) : (
            <h1>Data not available</h1>
          )}
        </section>
        {modalContent}
      </Suspense>
    </BeritaLayout>
  );
}

export default BeritaPage;
