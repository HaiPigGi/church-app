import MainLayout from '@/components/Layouts/MainLayout';
import Navbar from '@/components/Fragments/Navbar';
import Footer from '@/components/Fragments/Footer';

export default function tim() {
  return (
    <MainLayout>
      <div className="mt-20">
        <div className="mt-5 mb-[6rem] px-5">
          <h1 className="font-bold text-[40px] text-center text-black tracking-[6px] mt-[20px] mb-[10px]">
            About
          </h1>
          <h3 className="text-center text-gray-500 text-lg text-pretty leading-relaxed">
            Selamat datang di tim pembuat web kami yang penuh semangat dan
            berdedikasi! Kami adalah tim yang terdiri dari tiga orang ahli di
            bidangnya, masing-masing membawa keahlian unik untuk menciptakan
            pengalaman web yang luar biasa.
          </h3>
        </div>

        <div className="mt-5 mb-[6rem]">
          <div className="ml-[1.5rem] min-[357px]:ml-[-3rem]">
            <h1 className="font-bold text-3xl text-gray-800 ml-[5rem] tracking-[3px] mt-[20px] mb-[10px]  max-[765px]">
              Bekerja Sampai Pagi
            </h1>
            <h3 className="ml-[5rem] text-lg leading-relaxed text-slate-500 ">
              Kami adalah tim berbakat yang menyatukan keahlian unik untuk
              menciptakan pengalaman digital luar biasa. Jeffan, ahli frontend,
              menciptakan tampilan web yang dinamis. Heronimus, pengembang
              frontend dan desainer UI, menggabungkan estetika dan
              fungsionalitas. Bryan, ahli backend, memastikan fondasi kokoh
              untuk kinerja optimal. Bersama-sama, kami mewujudkan solusi web
              yang memukau dan tak terlupakan.
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mx-auto max-w-4xl mt-12">
            <div className="group">
              <div className="w-full aspect-square">
                <img
                  src="/img/j2.JPG"
                  alt="Janette Lynch"
                  sizes="(max-width: 800px) 100vw, 400px"
                  className="w-full rounded-md transition transform group-hover:-translate-y-1 group-hover:shadow-xl bg-white object-cover object-center aspect-square"
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-lg text-gray-800">Jeffan</h2>
                <h3 className="text-sm text-slate-500">FrontEnd</h3>
              </div>
            </div>
            <div className="group">
              <div className="w-full aspect-square">
                <img
                  src="/img/b2.JPG"
                  alt="Janette Lynch"
                  sizes="(max-width: 800px) 100vw, 400px"
                  className="w-full rounded-md transition transform group-hover:-translate-y-1 group-hover:shadow-xl bg-white object-cover object-center aspect-square"
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-lg text-gray-800">Bryan</h2>
                <h3 className="text-sm text-slate-500">BackEnd</h3>
              </div>
            </div>
            <div className="group">
              <div className="w-full aspect-square">
                <img
                  src="/img/abdi2.jpeg"
                  alt="Janette Lynch"
                  sizes="(max-width: 800px) 100vw, 400px"
                  className="w-full rounded-md transition transform group-hover:-translate-y-1 group-hover:shadow-xl bg-white object-cover object-center aspect-square"
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-lg text-gray-800">Heronimus</h2>
                <h3 className="text-sm text-slate-500">
                  FrontEnd And UI Desainer{' '}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MainLayout>
  );
}
