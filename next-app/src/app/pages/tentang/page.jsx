import Navbar from "@/components/Fragments/Navbar";
import Footer from "@/components/Fragments/Footer";
import MainLayout from "@/components/Layouts/MainLayout";

export default function about() {
  return (
    <MainLayout className="snap-y snap-mandatory h-screen w-full overflow-y-auto">
        <Navbar/>
        {/* gambar pertama */}
        <div className="mb-10 mt-10">
          <section className="parallax-1 bg-hero bg-no-repeat bg-cover bg-center bg-fixed min-h-[357px] sm:min-h-[375px]">
            <div className="parallax-inner py-[10%] px-0">
              <h1 className="font-bold text-[120px] text-center text-custom2 text-shadow1 min-[357px]:text-[70px]">
                SEJARAH GEREJA
              </h1>
            </div>
          </section>
          <h2 className="text-[32px] text-center text-custom font-300 tracking-[2px] mt-[20px] mb-[10px]">
          Gereja ST. Markus Melak
          </h2>
          <p className="text-[16px] text-black text-justify leading-[30px] mx-0 my-4[0px] mr-[50px] mt-5 ml-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem culpa rerum voluptates mollitia, officia illo
            adipisci assumenda quidem eveniet eum magnam vero numquam autem,
            deserunt repudiandae distinctio alias consequatur, illum dicta enim
            cum. Accusamus neque eligendi nemo, mollitia nihil ullam debitis et
            repellat optio, quasi id obcaecati libero numquam dolorum.
          </p>
        </div>
        
        {/* gambar ke dua */}
        <div className="mb-10">
          <section className="parallax-1 bg-depan bg-no-repeat bg-cover bg-center bg-fixed min-h-[357px] sm:min-h-[375px]">
            <div className="parallax-inner py-[10%] px-0">
              <h1 className="font-bold text-[120px] text-center text-custom2 text-shadow1 min-[357px]:text-[70px]">
                PASTOR PASTOR
              </h1>
            </div>
          </section>
          <h2 className="text-[32px] text-center text-custom font-300 tracking-[2px] mt-[20px] mb-[10px]">
          Pelayan Tuhan
          </h2>
          <p className="text-[16px] text-black text-justify leading-[30px] mx-0 my-4[0px] mr-[50px] mt-5 ml-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem culpa rerum voluptates mollitia, officia illo
            adipisci assumenda quidem eveniet eum magnam vero numquam autem,
            deserunt repudiandae distinctio alias consequatur, illum dicta enim
            cum. Accusamus neque eligendi nemo, mollitia nihil ullam debitis et
            repellat optio, quasi id obcaecati libero numquam dolorum.
          </p>
        </div>

        {/* gambar ke dua */}
        <div className="mb-10">
          <section className="parallax-1 bg-dalam bg-no-repeat bg-cover bg-center bg-fixed min-h-[357px] sm:min-h-[375px]">
            <div className="parallax-inner py-[10%] px-0">
              <h1 className="font-bold text-[120px] text-center text-custom2 text-shadow1 min-[357px]:text-[55px]">
                HARI BERSEJARAH GEREJA
              </h1>
            </div>
          </section>
          <h2 className="text-[32px] text-center text-custom font-300 tracking-[2px] mt-[20px] mb-[10px]">
          Hari Raya Gereja
          </h2>
          <p className="text-[16px] text-black text-justify leading-[30px] mx-0 my-4[0px] mr-[50px] mt-5 ml-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem culpa rerum voluptates mollitia, officia illo
            adipisci assumenda quidem eveniet eum magnam vero numquam autem,
            deserunt repudiandae distinctio alias consequatur, illum dicta enim
            cum. Accusamus neque eligendi nemo, mollitia nihil ullam debitis et
            repellat optio, quasi id obcaecati libero numquam dolorum.
          </p>
        </div>
      
      <Footer/>
    </MainLayout>
  );
}
