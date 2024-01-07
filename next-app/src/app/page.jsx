import MainLayout from "@/components/Layouts/MainLayout/index";
import Button from "@/components/Elements/Buttons";
import Footer from "@/components/Fragments/Footer";
import BeritaCard from "@/components/Fragments/BeritaCard";



export default function Home() {

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="snap-y snap-mandatory h-screen w-full overflow-y-scroll overflow-x-hidden bg-hero bg-fixed bg-center bg-cover bg-no-repeat ">

        <div className="snap-always snap-start relative w-full h-screen flex justify-center items-center">
          <div id="content-Hero" className="">
            <h1 className="text-4xl text-shadow font-bold text-white text-center">Gereja <span className="block text-secondary">ST. Markus Melak</span></h1>
            <p className="text-center text-white font-light text-sm text-shadow my-2">Temukan lebih banyak tentang komunitas gereja kami <br/>dengan login sekarang untuk eksplorasi lengkap</p>
            <Button href={"/pages/login"} intent="secondary" size="small" className="shadow-xl  mx-auto">LOGIN</Button>
          </div>
        </div>

        {/* Section Jadwal Misa */}
        <section className="snap-always snap-start  bg-transparent w-full h-screen flex justify-center items-center p-10">
          <div className="w-4/5 h-4/5">
            <h1 className="text-secondary text-center text-2xl font-bold text-shadow">Jadwal Misa</h1>
            <div className="grid grid-cols-2 gap-10 mt-5 w-full h-full">
              
            {/* Card on left */}
              <div className="border bg-white  border-secondary rounded-sm p-5 shadow-sm shadow-primary">
                {/* Card Title */}
                <h1 className="text-xl font-light text-center">Misa Harian</h1>
                {/* Card Body */}
                <div className="flex justify-between items-center py-5 border-b border-black">
                  <h3 className="text-primary font-bold">Senin</h3>
                  <p>05:30-Selesai</p>
                </div>
                <div className="flex justify-between items-center py-5 border-b border-black">
                  <h3 className="text-primary font-bold">Selasa</h3>
                  <p>05:30-Selesai</p>
                </div>
                <div className="flex justify-between items-center py-5 border-b border-black">
                  <h3 className="text-primary font-bold">Rabu</h3>
                  <p>05:30-Selesai</p>
                </div>
                <div className="flex justify-between items-center py-5 border-b border-black">
                  <h3 className="text-primary font-bold">Kamis</h3>
                  <p>05:30-Selesai</p>
                </div>
                <div className="flex justify-between items-center py-5 border-b border-black">
                  <h3 className="text-primary font-bold">Jumat</h3>
                  <p>05:30-Selesai</p>
                </div>
              </div>

              {/* Card on right */}
              <div className=" border bg-white  border-secondary rounded-sm p-5 shadow-sm shadow-primary">
                <h1 className="text-xl font-light text-center">Misa Mingguan</h1>
                {/* Card Body */}
                <div className="flex justify-between items-center py-5 border-b border-black">
                  <h3 className="text-primary font-bold">Sabtu</h3>
                  <p>17:30-Selesai</p>
                </div>
                <div className="flex justify-between items-center py-5 border-b border-black">
                  <h3 className="text-primary font-bold">Minggu</h3>
                  <div className="text-right" >
                    <p className="block">07:30-Selesai</p>
                    <p>17:30-Selesai</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="snap-always snap-start relative w-full h-screen  p-20">
          <h1 className="text-secondary text-center text-2xl font-bold">Berita Terkini</h1>
          <div className="grid grid-cols-2 mt-2">
            <div>
              <BeritaCard
              src="/img/bgHero.jpeg"
              title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
              desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
              />
              <BeritaCard
              src="/img/bgHero.jpeg"
              title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
              desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
              />
              <BeritaCard
              src="/img/bgHero.jpeg"
              title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
              desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
              />
            </div>
            <div>
              <BeritaCard
              src="/img/bgHero.jpeg"
              title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
              desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
              />
              <BeritaCard
              src="/img/bgHero.jpeg"
              title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
              desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
              />
              <BeritaCard
              src="/img/bgHero.jpeg"
              title="Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya"
              desc="Seminar yang diadakan oleh komunitas pemuda bertujuan menggali potensi generasi muda dalam mewujudkan perubahan positif dalam berbagai aspek kehidupan."
              />

            </div>
          </div>
        </section>
        <Footer/>
      </section>
      
    </MainLayout>
  )
};
