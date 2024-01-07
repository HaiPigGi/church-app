import MainLayout from "@/components/Layouts/MainLayout/index";
import Button from "@/components/Elements/Buttons";
import Footer from "@/components/Fragments/Footer";



export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="snap-y snap-mandatory h-screen w-full overflow-y-scroll overflow-x-hidden">
        <div className="snap-always snap-center relative w-full h-screen bg-hero bg-fixed bg-center bg-cover bg-no-repeat flex justify-center items-center 
                            before:absolute before:w-full before:h-full before:bg-gradient-to-t before:from-white before:from-[5px] before:via-transparent before:to-transparent before:to-90% before:z-20 before:bottom-[-3rem]
                            after:absolute after:w-full after:h-full after:z-10 after:bg-[url('/img/bgHeroChair.png')] after:bg-bottom after:left-[4px] after:bottom-[-3rem] after:bg-contain after:bg-no-repeat">
          <div id="content-Hero" className="fixed">
            <h1 className="text-4xl text-shadow font-bold text-white text-center">Gereja <span className="block text-secondary">ST. Markus Melak</span></h1>
            <p className="text-center text-white font-light text-sm text-shadow my-2">Temukan lebih banyak tentang komunitas gereja kami <br/>dengan login sekarang untuk eksplorasi lengkap</p>
            {/* <Button intent="secondary" size="small" className="shadow-xl  mx-auto">Login</Button> */}
          </div>
        </div>

        {/* Section Jadwal Misa */}
        <section className="snap-always snap-center relative bg-white w-full h-screen flex justify-center items-center p-10">
          <div className="w-4/5 h-4/5">
            <h1 className="text-primary text-center text-2xl font-bold">Jadwal Misa</h1>
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

        <section className="snap-always snap-center relative w-full h-screen bg-white">

        </section>
        <Footer/>
      </section>
      
    </MainLayout>
  )
};
