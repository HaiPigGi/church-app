'use client';
import MainLayout from '@/components/Layouts/MainLayout/index';
import Footer from '@/components/Fragments/Footer';
import Navbar from '@/components/Fragments/Navbar';
import useOmk from '@/lib/customHooks/useOMK';
import Loading from '@/components/Fragments/Loading/loading';
import useModalContent from '@/lib/customHooks/useModalContent';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Struktur() {
  const { getAllMembers, changeLoadingFetch, loadingFetch, omk, omk_list } =
    useOmk();
  const { clearState, modalContent, setModalContent } = useModalContent();

  useEffect(() => {
    changeLoadingFetch(true);
    getAllMembers();
  }, []);

  const showPersonalData = (data) => {
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

  return loadingFetch ? (
    <Loading />
  ) : (
    <MainLayout>
        <section className="snap-y snap-mandatory h-screen w-full overflow-y-auto">
      <Navbar/>
        <div className="relative items-center justify-center mb-[5rem] mt-[-3rem] overflow-hidden">
          <section>
            <div
              className={'flex flex-col items-center '.concat(
                modalContent ? 'blur' : '',
              )}
            >
              <h2 className="text-black font-poppins text-5xl font-bold leading-[112px] pt-20">
                Struktur Organisasi OMK
              </h2>
              <div
                className={'grid relative gap-10 grid-cols-1 px-5 '.concat(
                  omk_list.length > 1 ? 'md:grid-cols-2 ' : 'md:grid-cols-1 ',
                )}
              >
                {omk_list.length < 1 ? (
                  <h1 className="w-full text-center text-bold">
                    Data OMK belum tersedia
                  </h1>
                ) : (
                  omk_list.map((data) => {
                    /* gambar 1 */
                    return (
                      <button
                        className="relative mb-5 md:mr-10 md:mb-[-1.4rem] min-[357px]:mb-8"
                        onClick={() => showPersonalData(data)}
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
                          <p className="text-white text-lg font-bold capitalize">
                            {data.members_name}
                          </p>
                        </div>
                        <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-primary text-lg font-bold">
                            {data.position_name}
                          </p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>


              <div className="flex flex-col md:flex-row justify-center items-center relative mt-[4rem] mx-5">
                {/* gambar 3 */}
                <div className="relative left-3 mb-5 md:mr-10 md:mb-[-3rem] min-[375px]:mb-10 min-[375px]:mt-[-1.5rem] min-[375px]:left-0 ">
                  <img
                    className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/unsplash_NDcN_8JiAqw.png"
                    alt=""
                  />
                  <img
                    className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/Rectangle 20.png"
                    alt=""
                  />
                  <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-white text-lg font-bold">Nama</p>
                  </div>
                  <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-primary text-lg font-bold">Sekretaris 1</p>
                  </div>
                </div>

                {/* gambar 4 */}
                <div className="relative mb-5 md:mr-10 md:mb-0 min-[375px]:mb-10 min-[375px]:mt-[1.5rem]">
                  <img
                    className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/unsplash_NDcN_8JiAqw.png"
                    alt=""
                  />
                  <img
                    className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/Rectangle 20.png"
                    alt=""
                  />
                  <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-white text-lg font-bold">Nama</p>
                  </div>
                  <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-primary text-lg font-bold">Sekretaris 2</p>
                  </div>
                </div>

                {/* gambar 5 */}
                <div className="relative mb-5 md:mr-10 md:mb-0 min-[375px]:mb-10 min-[375px]:mt-[1.5rem]">
                  <img
                    className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/unsplash_NDcN_8JiAqw.png"
                    alt=""
                  />
                  <img
                    className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/Rectangle 20.png"
                    alt=""
                  />
                  <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-white text-lg font-bold">Nama</p>
                  </div>
                  <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-primary text-lg font-bold">Bendahara 1</p>
                  </div>
                </div>

                {/* gambar 6 */}
                <div className="relative top-[1.2rem] right-1 min-[375px]:mt-[1.5rem] min-[375px]:mb-10 min-[375px]:right-0">
                  <img
                    className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem] "
                    src="/img/unsplash_NDcN_8JiAqw.png"
                    alt=""
                  />
                  <img
                    className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/Rectangle 20.png"
                    alt=""
                  />
                  <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-white text-lg font-bold">Nama</p>
                  </div>
                  <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-primary text-lg font-bold">Bendahara 2</p>
                  </div>
                </div>
              </div>

              {/* card anggta */}
              <div className="flex flex-col md:flex-row justify-center items-center relative mt-[4rem] mx-5 overflow-x-scroll min-w-full">
                {/* gambar 7 */}
                <div className="relative left-2 mb-5 md:mr-10 md:mb-[-3rem] min-[375px]:mb-10 min-[375px]:mt-[-1.5rem] min-[375px]:left-0 min-w-64">
                  <img
                    className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/unsplash_NDcN_8JiAqw.png"
                    alt=""
                  />
                  <img
                    className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/Rectangle 20.png"
                    alt=""
                  />
                  <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-white text-lg font-bold">Nama</p>
                  </div>
                  <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-primary text-lg font-bold">Anggota</p>
                  </div>
                </div>
                {/* gambar 7 */}
                <div className="relative left-2 mb-5 md:mr-10 md:mb-[-3rem] min-[375px]:mb-10 min-[375px]:mt-[-1.5rem] min-[375px]:left-0 min-w-64">
                  <img
                    className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/unsplash_NDcN_8JiAqw.png"
                    alt=""
                  />
                  <img
                    className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/Rectangle 20.png"
                    alt=""
                  />
                  <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-white text-lg font-bold">Nama</p>
                  </div>
                  <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-primary text-lg font-bold">Anggota</p>
                  </div>
                </div>
                {/* gambar 7 */}
                <div className="relative left-2 mb-5 md:mr-10 md:mb-[-3rem] min-[375px]:mb-10 min-[375px]:mt-[-1.5rem] min-[375px]:left-0 min-w-64">
                  <img
                    className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/unsplash_NDcN_8JiAqw.png"
                    alt=""
                  />
                  <img
                    className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/Rectangle 20.png"
                    alt=""
                  />
                  <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-white text-lg font-bold">Nama</p>
                  </div>
                  <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-primary text-lg font-bold">Anggota</p>
                  </div>
                </div>
                {/* gambar 7 */}
                <div className="relative left-2 mb-5 md:mr-10 md:mb-[-3rem] min-[375px]:mb-10 min-[375px]:mt-[-1.5rem] min-[375px]:left-0 min-w-64">
                  <img
                    className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/unsplash_NDcN_8JiAqw.png"
                    alt=""
                  />
                  <img
                    className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/Rectangle 20.png"
                    alt=""
                  />
                  <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-white text-lg font-bold">Nama</p>
                  </div>
                  <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-primary text-lg font-bold">Anggota</p>
                  </div>
                </div>
                {/* gambar 7 */}
                <div className="relative left-2 mb-5 md:mr-10 md:mb-[-3rem] min-[375px]:mb-10 min-[375px]:mt-[-1.5rem] min-[375px]:left-0 min-w-64">
                  <img
                    className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/unsplash_NDcN_8JiAqw.png"
                    alt=""
                  />
                  <img
                    className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/Rectangle 20.png"
                    alt=""
                  />
                  <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-white text-lg font-bold">Nama</p>
                  </div>
                  <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-primary text-lg font-bold">Anggota</p>
                  </div>
                </div>
                {/* gambar 7 */}
                <div className="relative left-2 mb-5 md:mr-10 md:mb-[-3rem] min-[375px]:mb-10 min-[375px]:mt-[-1.5rem] min-[375px]:left-0 min-w-64">
                  <img
                    className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/unsplash_NDcN_8JiAqw.png"
                    alt=""
                  />
                  <img
                    className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/Rectangle 20.png"
                    alt=""
                  />
                  <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-white text-lg font-bold">Nama</p>
                  </div>
                  <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-primary text-lg font-bold">Anggota</p>
                  </div>
                </div>
                {/* gambar 7 */}
                <div className="relative left-2 mb-5 md:mr-10 md:mb-[-3rem] min-[375px]:mb-10 min-[375px]:mt-[-1.5rem] min-[375px]:left-0 min-w-64">
                  <img
                    className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/unsplash_NDcN_8JiAqw.png"
                    alt=""
                  />
                  <img
                    className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/Rectangle 20.png"
                    alt=""
                  />
                  <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-white text-lg font-bold">Nama</p>
                  </div>
                  <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-primary text-lg font-bold">Anggota</p>
                  </div>
                </div>

                {/* gambar 8 */}
                <div className="relative mb-5 md:mr-10 md:mb-0 min-[375px]:mb-10 min-[375px]:mt-[1.5rem] min-w-64">
                  <img
                    className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/unsplash_NDcN_8JiAqw.png"
                    alt=""
                  />
                  <img
                    className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/Rectangle 20.png"
                    alt=""
                  />
                  <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-white text-lg font-bold">Nama</p>
                  </div>
                  <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-primary text-lg font-bold">Anggota</p>
                  </div>
                </div>

                {/* gambar 9 */}
                <div className="relative mb-5 md:mr-10 md:mb-0 min-[375px]:mb-10 min-[375px]:mt-[1.5rem] min-w-64">
                  <img
                    className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/unsplash_NDcN_8JiAqw.png"
                    alt=""
                  />
                  <img
                    className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/Rectangle 20.png"
                    alt=""
                  />
                  <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-white text-lg font-bold">Nama</p>
                  </div>
                  <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-primary text-lg font-bold">Anggota</p>
                  </div>
                </div>

                {/* gambar 10 */}
                <div className="relative right-2  min-[375px]:mt-[1.5rem] min-[375px]:right-0 ">
                  <img
                    className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/unsplash_NDcN_8JiAqw.png"
                    alt=""
                  />
                  <img
                    className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                    src="/img/Rectangle 20.png"
                    alt=""
                  />
                  <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-white text-lg font-bold">Nama</p>
                  </div>
                  <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                    <p className="text-primary text-lg font-bold">Anggota</p>
                  </div>
                </div>
              </div>


            </div>
          </section>
        </div>
        <Footer />
      </section>
      {modalContent}
    </MainLayout>
  );
}
