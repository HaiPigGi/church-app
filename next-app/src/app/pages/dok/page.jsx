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
  const [photos, setPhotos] = useState([]);
  const [eventCategory] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  const getDokumentasi = async () => {
    setLoadingState(true);
    let res = await getAllDokumentasi();
    if (isResponseError(res, setModalContent, clearState)) return;
    const data = await res.json();
    console.log(data.data);
    setPhotos(data.data);
    setLoadingState(false);
  };

  const getAllCategory = () => {
    photos.forEach((value) => {
      if (eventCategory.includes(value.jenis_kegiatan)) return;
      eventCategory.push(value);
    });
  };

  useEffect(() => {
    getDokumentasi();
  }, []);

  useEffect(() => {
    getAllCategory();
  }, [photos]);

  return (
    <MainLayout>
      <Navbar />
      <div className=" w-full h-screen ">
        <h1 className="text-center text-2xl font-bold my-10">
          Dokumentasi Kegiatan
        </h1>
        <div className=" flex mb-16 items-center justify-center min-[360px]:max-[765px]:flex-col h-auto w-full ">
          {loadingState ? (
            <Loading />
          ) : eventCategory.length > 0 ? (
            eventCategory.map((Docs) => (
              <EventCategoryCard value={Docs} key={Docs.dokumentasi_id} />
            ))
          ) : (
            <h1 className="text-2xl font-bold text-center">
              Dokumentasi belum tersedia
            </h1>
          )}
        </div>
      </div>
      {modalContent}
      <Footer />
    </MainLayout>
  );
}

const EventCategoryCard = ({ value }) => {
  const router = useRouter();
  return (
    <div className=" flex flex-col mr-5 bg-secondary shadow-md bg-clip-border rounded-xl w-96 h-96 min-[360px]:max-[765px]:mb-10">
      <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img
          src={value.images.url}
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
