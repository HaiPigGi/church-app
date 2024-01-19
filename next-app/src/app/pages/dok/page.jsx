"use client"
import MainLayout from "@/components/Layouts/MainLayout"
import Footer from "@/components/Fragments/Footer"
import Navbar from "@/components/Fragments/Navbar"


export default function Dokumentasi (){

    return(
        <MainLayout>
            <a className="snap-y snap-mandatory h-screen w-full overflow-y-auto">
                <Navbar />
            </a>
            <div className="flex grid-cols-3 mt-20 mb-16 items-center justify-center min-[360px]:max-[765px]:flex-col ">
                
                {/* event pertama */}
            <div class="relative flex flex-col mr-5 text-gray-700 bg-secondary shadow-md bg-clip-border rounded-xl w-96 h-96 min-[360px]:max-[765px]:mb-10 ">
                <div
                    class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                    <img
                    src="https://i.pinimg.com/564x/f0/8f/a7/f08fa745964ffbbe57a6ad3a0680464f.jpg "
                    alt="card-image" class="w-full h-full object-cover object-center"/>
                </div>
                <div class="p-6">
                    <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Natal
                    </h5>
                    <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    Natal merayakan kelahiran Yesus, dengan tradisi pohon, hadiah, dan makanan. Simbol kebersamaan dan kasih sayang bersama keluarga.
                    </p>
                </div>
                <div class="p-6 pt-0">
                <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button"
                    >
                    <a href="/pages/dok/fotonatal">Read More</a>
                </button>
                </div>
            </div> 

            {/* event ke dua */}
            <div class="relative flex flex-col mr-5 text-gray-700 bg-secondary shadow-md bg-clip-border rounded-xl w-96 h-96 min-[360px]:max-[765px]:mb-10  ">
                <div
                    class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                    <img
                    src="https://i.pinimg.com/564x/10/d6/b7/10d6b7b5c1c41d63b32128b3fd522962.jpg"
                    alt="card-image" />
                </div>
                <div class="p-6">
                    <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Paskah
                    </h5>
                    <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    Paskah adalah perayaan Kristen yang merayakan kebangkitan Yesus Kristus dari kematian, dan peristiwa kehidupan baru dan keampunan.
                    </p>
                </div>
                <div class="p-6 pt-0">
                    <button
                    class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button">
                    <a href="/pages/dok/paskah">Read More</a>
                    </button>
                </div>
            </div> 

            {/* event ketiga */}
            <div class="relative flex flex-col  text-gray-700 bg-secondary shadow-md bg-clip-border rounded-xl w-96 h-96 min-[360px]:max-[765px]:mb-10">
                <div
                    class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                    <img
                    src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                    alt="card-image" />
                </div>
                <div class="p-6">
                    <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    Gak tau isi apa ini
                    </h5>
                    <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, repellendus?.
                    </p>
                </div>
                <div class="p-6 pt-0">
                    <button
                    class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button">
                    Read More
                    </button>
                </div>
            </div> 
        </div>
            <Footer/>
        </MainLayout>
    )
    
};
