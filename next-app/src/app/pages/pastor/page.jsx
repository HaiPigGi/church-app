'use client';
import MainLayout from '@/components/Layouts/MainLayout/index';
import Footer from '@/components/Fragments/Footer';
import Navbar from '@/components/Fragments/Navbar';
import { isResponseError } from '../admin/posisi';
import useModalContent from '@/lib/customHooks/useModalContent';
import { useEffect, useState } from 'react';
import Loading from '@/components/Fragments/Loading/loading';
import Image from 'next/image';

export default function Pastor() {
  const [pastorsDat, setPastorsDat] = useState();
  const [loadingStatus, setLoadingStatus] = useState(true);
  const { modalContent, setModalContent, clearState } = useModalContent();

  async function getAllMembers() {
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/member`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (isResponseError(res, setModalContent, clearState)) return;
      res = await res.json();
      res = res.data.filter((data) => data.organitation_name == 'Pastoran');
      setLoadingStatus(false);
      setPastorsDat(res);
    } catch (e) {
      console.log(
        'error at getAllMember on pastor/page.jsx with message : ',
        e.message,
      );
    }
  }

  const handleImageClick = (data) => {
    setModalContent('show', {
      content: <PersonalData data={data} />,
      action: clearState,
    });
  };

  const PersonalData = ({ data }) => {
    return (
      <div className="relative grid md:grid-rows-4 grid-cols-1 w-full h-full gap-2 ">
        <div className="absolute -right-6 -top-5">
          <i class="ri-close-circle-fill ri-xl"></i>
        </div>
        <div className="relative row-span-3 w-full min-h-[125px] h-full">
          <Image
            src={data.image.url}
            fill={true}
            className="object-contain rounded-xl object-center"
          />
        </div>
        <div className="relative row-span-1 w-full h-full">
          <h1 className="font-bold text-2xl line-clamp-2 capitalize">
            {data.members_name}
          </h1>
          <h1 className="text-lg font-semibold">{data.position_name}</h1>
          <h1 className="text-md">{data.born_date}</h1>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setLoadingStatus(true);
    getAllMembers();
  }, []);

  useEffect(() => {
  }, [pastorsDat]);

  return loadingStatus ? (
    <Loading />
  ) : (
    <section className="snap-y snap-mandatory h-screen w-full overflow-y-auto">
      <MainLayout>
        <Navbar />
        <div className="relative items-center justify-center mb-10  mt-[-3rem]">
          <section>
            <div
              className={'flex flex-col items-center '.concat(
                modalContent ? 'blur' : '',
              )}
            >
              <h2 className="text-black font-poppins text-5xl font-bold leading-[112px] pt-20">
                Pastor Paroki
              </h2>
              <div
                className={'grid relative gap-10 grid-cols-1 px-5 '.concat(
                  pastorsDat.length > 1 ? 'md:grid-cols-2 ' : 'md:grid-cols-1 ',
                )}
              >
                {pastorsDat.length < 1 ? (
                  <h1 className="w-full text-center text-bold">
                    Data pastor belum tersedia
                  </h1>
                ) : (
                  pastorsDat.map((data) => {
                    return (
                      <button
                        className="relative mb-5 md:mb-0 col-span-1 transition-all duration-500 hover:translate-x-2 hover:-translate-y-2"
                        onClick={() => handleImageClick(data)}
                      >
                        <img
                          className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src={data.image.url}
                          alt={data.members_name}
                        />
                        <img
                          className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src="/img/Rectangle 20.png"
                          alt=""
                        />
                        <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-white text-lg font-bold">
                            {data.members_name}
                          </p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </section>
        </div>
        {modalContent}
        <Footer />
      </MainLayout>
    </section>
  );
}
