'use client';
import MainLayout from '@/components/Layouts/MainLayout';
import Footer from '@/components/Fragments/Footer';
import Navbar from '@/components/Fragments/Navbar';
import { getAllDokumentasi } from '@/app/api/User/Dokumentasi/routes.jsx';
import { isResponseError } from '../admin/posisi';
import useModalContent from '@/lib/customHooks/useModalContent';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Fragments/Loading/loading';

export default function Dokumentasi() {
  const { clearState, modalContent, setModalContent } = useModalContent();
  const [eventCategory] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  const getDokumentasi = async () => {
    setLoadingState(true);
    let res = await getAllDokumentasi();
    if (isResponseError(res, setModalContent, clearState)) return;
    const data = await res.json();
    getAllCategory(data.data);
    setLoadingState(false);
  };

  const getAllCategory = (docs) => {
    docs.forEach((value) => {
      if (eventCategory.includes(value.jenis_kegiatan)) return;
      eventCategory.push(value.jenis_kegiatan);
      photos.push(value);
    });
  };

  useEffect(() => {
    getDokumentasi();
  }, []);

  return (
    <MainLayout>
      <Navbar />
      {loadingState ? (
        <Loading />
      ) : photos.length > 0 ? (
        <div className=" w-full h-screen ">
          <h1 className="text-center text-2xl font-bold my-10">
            Dokumentasi Kegiatan
          </h1>
          <div className="w-full overflow-x-auto relative h-[27rem] mx-5">
            <div className="absolute left-0 flex  items-center justify-center min-[360px]:max-[765px]:flex-col  h-[27rem]">
              {photos.map((Docs) => (
                <EventCategoryCard value={Docs} key={Docs.dokumentasi_id} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center">
          <h1 className="text-2xl font-bold text-center w-full">
            Dokumentasi belum tersedia
          </h1>
        </div>
      )}
      {modalContent}
      <Footer />
    </MainLayout>
  );
}

const EventCategoryCard = ({ value }) => {
  const router = useRouter();
  return (
    <div className="mx-2 flex flex-col bg-secondary shadow-md bg-clip-border rounded-xl min-w-96 min-h-96 min-[360px]:max-[765px]:mb-10">
      <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img
          src={value.images[0].url}
          alt={value.jenis_kegiatan}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-6">
        <h1 className="block mb-2 text-2xl antialiased font-semibold leading-snug tracking-normal capitalize text-white ">
          {value.jenis_kegiatan}
        </h1>
      </div>
      <div className="p-6 pt-0">
        <button
          className="align-middle select-none font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={() => router.push(`/pages/dok/${value.jenis_kegiatan}`)}
        >
          Read More
        </button>
      </div>
    </div>
  );
};
