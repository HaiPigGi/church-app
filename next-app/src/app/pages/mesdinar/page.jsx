'use client';
import MainLayout from '@/components/Layouts/MainLayout/index';
import Footer from '@/components/Fragments/Footer';
import Navbar from '@/components/Fragments/Navbar';
import { getAllDataMisdinar } from '@/app/api/User/misdinar/route';
import { useEffect, useState } from 'react';

export default function Mesdinar() {
  const [misdinarData, setMisdinarData] = useState([]);

  const fetchData = async () => {
    try {
      let res = await getAllDataMisdinar();
      res = await res.json();
      const responseJson = res.data;

      // Filter data berdasarkan organitation_name
      const filteredData = responseJson.filter(
        (item) => item.organitation_name === 'Misdinar',
      );

      setMisdinarData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="snap-y snap-mandatory h-screen w-full overflow-y-auto">
      <MainLayout>
        <Navbar />
        <div className="relative items-center justify-center mb-[5rem] mt-[-3rem]">
          <section>
            <div className="flex flex-col items-center">
              <h2 className="text-black font-poppins  md:text-5xl md:font-bold leading-[112px] pt-20 min-[357px]:text-primary min-[357px]:text-xl min-[357px]:mt-10 min-[357px]:mb-5  max-[775px]:text-black md:text-black">
                Struktur Organisasi Mesdinar
              </h2>
              <div className="flex flex-col md:flex-row justify-center items-center relative">
                {/* Gambar Ketua */}
                {misdinarData.map(
                  (data, index) =>
                    data.position_name === 'Ketua' && (
                      <div
                        key={index}
                        className="relative mb-5 md:mr-10 md:mb-[-1.4rem] min-[357px]:mb-8"
                      >
                        <img
                          className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src={data.image.url}
                          alt=""
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
                        <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-primary text-lg font-bold">
                            {data.position_name}
                          </p>
                        </div>
                      </div>
                    ),
                )}

                {/* Gambar wakil */}
                {misdinarData.map(
                  (data, index) =>
                    data.position_name === 'Wakil' && (
                      <div
                        key={index}
                        className="relative min-[357px]:mt-10 min-[357px]:mb-5"
                      >
                        <img
                          className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src={data.image.url}
                          alt=""
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
                        <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-primary text-lg font-bold">
                            {data.position_name}
                          </p>
                        </div>
                      </div>
                    ),
                )}
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center relative mt-[4rem]">
                {/* Gambar Sekretaris 1 */}
                {misdinarData.map(
                  (data, index) =>
                    data.position_name === 'Sekretaris 1' && (
                      <div
                        key={index}
                        className="relative mb-5 md:mr-10 md:mb-[-1.4rem] min-[357px]:mb-8"
                      >
                        <img
                          className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src={data.image.url}
                          alt=""
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
                        <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-primary text-lg font-bold">
                            {data.position_name}
                          </p>
                        </div>
                      </div>
                    ),
                )}

                {/* Gambar Sekretaris 2 */}
                {misdinarData.map(
                  (data, index) =>
                    data.position_name === 'Sekretaris 2' && (
                      <div
                        key={index}
                        className="relative mb-5 md:mr-10 md:mb-[-1.4rem] min-[357px]:mb-8"
                      >
                        <img
                          className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src={data.image.url}
                          alt=""
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
                        <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-primary text-lg font-bold">
                            {data.position_name}
                          </p>
                        </div>
                      </div>
                    ),
                )}

                {/* Gambar Bendahara 1 */}
                {misdinarData.map(
                  (data, index) =>
                    data.position_name === 'Bendahara 1' && (
                      <div
                        key={index}
                        className="relative mb-5 md:mr-10 md:mb-[-1.4rem] min-[357px]:mb-8"
                      >
                        <img
                          className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src={data.image.url}
                          alt=""
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
                        <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-primary text-lg font-bold">
                            {data.position_name}
                          </p>
                        </div>
                      </div>
                    ),
                )}
                {/* Gambar Bendahara 2 */}
                {misdinarData.map(
                  (data, index) =>
                    data.position_name === 'Bendahara 2' && (
                      <div
                        key={index}
                        className="relative mb-5 md:mr-10 md:mb-[-1.4rem] min-[357px]:mb-8"
                      >
                        <img
                          className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src={data.image.url}
                          alt=""
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
                        <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-primary text-lg font-bold">
                            {data.position_name}
                          </p>
                        </div>
                      </div>
                    ),
                )}
              </div>
              {/* card anggota */}
              <div className="flex flex-col md:flex-row justify-center items-center relative mt-[4rem] overflow-x-auto">
                {/* Gambar Anggota */}
                {misdinarData.map(
                  (data, index) =>
                    data.position_name === 'Anggota Misdinar' && (
                      <div
                        key={index}
                        className="relative mb-5 md:mr-10 md:mb-[-1.4rem] min-[357px]:mb-8"
                      >
                        <img
                          className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src={data.image.url}
                          alt=""
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
                        <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-primary text-lg font-bold">
                            Anggota
                          </p>
                        </div>
                      </div>
                    ),
                )}
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </MainLayout>
    </section>
  );
}
