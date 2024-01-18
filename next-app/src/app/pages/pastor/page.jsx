import MainLayout from "@/components/Layouts/MainLayout/index";
import Footer from "@/components/Fragments/Footer";
import Navbar from "@/components/Fragments/Navbar";

export default function Pastor() {
  return (
    <section className="snap-y snap-mandatory h-screen w-full overflow-y-auto">
      <MainLayout>
        <Navbar/>
        <div className="relative items-center justify-center mb-10  mt-[-3rem]">
          <section>
            <div className="flex flex-col items-center">
              <h2 className="text-black font-poppins text-5xl font-bold leading-[112px] pt-20">Pastor Paroki</h2>
              <div className="flex flex-col md:flex-row justify-center items-center relative">

                {/* gambar 1 */}
                <div className="relative mb-5 md:mr-10 md:mb-0">
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
                </div>

                {/* gambar 2 */}
                <div className="relative">
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
                </div>
              </div>


              <div className="flex flex-col md:flex-row justify-center items-center relative mt-5">
                {/* gambar 3 */}
                <div className="relative mb-5 md:mr-10 md:mb-0">
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
                </div>

                {/* gambar 4 */}
                <div className="relative">
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
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer/>
      </MainLayout>
    </section>
  );
}
