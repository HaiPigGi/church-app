import MainLayout from "@/components/Layouts/MainLayout/index";
import Footer from "@/components/Fragments/Footer";
import Navbar from "@/components/Fragments/Navbar";

export default function Paskah() {
  return (
      <MainLayout>
       <section className="snap-y snap-mandatory h-screen w-full overflow-y-auto">
        <Navbar /> 
        <div className="relative items-center justify-center mb-[5rem] mt-[-3rem]">
          <section>
            <div className="flex flex-col items-center">
              <h2 className="text-black font-poppins  md:text-5xl md:font-bold leading-[112px] pt-20 min-[357px]:text-primary min-[357px]:text-xl min-[357px]:mt-10 min-[357px]:mb-5  max-[775px]:text-black md:text-black">Panitia Paskah</h2>
              <div className="flex flex-col md:flex-row justify-center items-center relative">

                {/* gambar 1 */}
                <div className="relative mb-5 md:mr-10 md:mb-[-1.4rem] min-[357px]:mb-8">
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
                    <p className="text-primary text-lg font-bold">KETUA</p>
                  </div>

                </div>

                {/* gambar 2 */}
                <div className="relative min-[357px]:mt-10 min-[357px]:mb-5">
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
                    <p className="text-primary text-lg font-bold">WAKIL</p>
                  </div>
                </div>
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
              <div className="flex flex-col md:flex-row justify-center items-center relative mt-[4rem] mx-5">
                {/* gambar 7 */}
                <div className="relative left-2 mb-5 md:mr-10 md:mb-[-3rem] min-[375px]:mb-10 min-[375px]:mt-[-1.5rem] min-[375px]:left-0">
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
                    <p className="text-primary text-lg font-bold">Anggota</p>
                  </div>
                </div>

                {/* gambar 9 */}
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
                    <p className="text-primary text-lg font-bold">Anggota</p>
                  </div>
                </div>

                {/* gambar 10 */}
                <div className="relative right-2  min-[375px]:mt-[1.5rem] min-[375px]:right-0">
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
        <Footer/>
      </section>
    </MainLayout>
  );
}
