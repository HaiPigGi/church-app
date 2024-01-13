"use client"
import Link from "next/link";
import { useState } from "react";

function BeritaSideBar(){
    const [openSideBar, setOpenSideBar] = useState(true)
    const handleClick = () => {
        setOpenSideBar(!openSideBar);
        const sidebar = document.querySelector("#sidebarBerita");
        console.log(sidebar);
        console.log(openSideBar);
        if(openSideBar){
            sidebar.classList.remove("hidden")
            sidebar.classList.remove("w-0")
            sidebar.classList.remove("right-[-100%]")
            sidebar.classList.add("right-0")
            sidebar.classList.add("w-full")
        }else{
            sidebar.classList.add("hidden")
            sidebar.classList.add("right-[-100%]")
            sidebar.classList.remove("right-0")
            sidebar.classList.remove("w-full")
            sidebar.classList.add("w-0")

        }
        return;
    }
    return(
        <>
            <button className="md:hidden absolute right-0 w-10 h-12 bg-white shadow-xl border border-slate-500 rounded-l-xl top-[5rem] flex justify-center items-center" onClick={handleClick}>
                <i className="ri-menu-fold-fill ri-xl"></i>
            </button>
            <aside id="sidebarBerita" className="absolute transition-all hidden md:block right-[-100%]  h-full md:static md:col-span-1 md:w-full md:h-full border-l-2 border-slate-500 shadow-xl bg-white py-5 px-5">
                    <button className="md:hidden absolute right-2 top-4 w-12 h-12 z-20" onClick={handleClick}>
                        <i className="ri-close-line ri-xl"></i>
                    </button>
                <div className="relative h-56 overflow-y-auto">
                    <h1 className="text-xl font-bold sticky top-0 py-1 bg-white w-full z-0">Pengumuman Mendatang</h1>
                    <div className="py-2 border-b border-black hover:text-primary hover:border-primary">
                        {/* define routes with /pages/berita/[berita_id] */}
                        <Link className="text-pretty  text-sm " href="/pages/berita/1">Pemberitahuan Penting: Seminar Keluarga Sejahtera Mendatang</Link>
                    </div>
                    <div className="py-2 border-b border-black hover:text-primary hover:border-primary">
                        {/* define routes with /pages/berita/[berita_id] */}
                        <Link className="text-pretty  text-sm " href="/pages/berita/2">Simak! Pengumuman Konser Natal Tahun Ini: 'Mengukir Kebahagiaan Bersama</Link>
                    </div>
                    <div className="py-2 border-b border-black hover:text-primary hover:border-primary">
                        {/* define routes with /pages/berita/[berita_id] */}
                        <Link className="text-pretty  text-sm " href="/pages/berita/3">Panggilan: Gabunglah dalam Kegiatan Sosial Kemanusiaan Bulan Depan</Link>
                    </div>
                    <div className="py-2 border-b border-black hover:text-primary hover:border-primary">
                        {/* define routes with /pages/berita/[berita_id] */}
                        <Link className="text-pretty  text-sm " href="/pages/berita/4">Pemuda Aktif! Persiapan Retreat Rohani 'Menemukan Tujuan Hidup</Link>
                    </div>
                    <div className="py-2 border-b border-black hover:text-primary hover:border-primary">
                        {/* define routes with /pages/berita/[berita_id] */}
                        <Link className="text-pretty  text-sm " href="/pages/berita/5">Acara Minggu Ini: Kebaktian Khusus 'Membangun Kepribadian Kristen</Link>
                    </div>
                </div>
                <div className="h-72 overflow-y-auto mt-5">
                    <h1 className="text-xl font-bold sticky top-0 py-1 bg-white w-full  z-0">Berita lainnya</h1>
                    <div className="py-2 border-b border-black hover:text-primary hover:border-primary">
                        {/* define routes with /pages/berita/[berita_id] */}
                        <Link className="text-pretty  text-sm " href="/pages/berita/1">Pemberitahuan Penting: Seminar Keluarga Sejahtera Mendatang</Link>
                    </div>
                    <div className="py-2 border-b border-black hover:text-primary hover:border-primary">
                        {/* define routes with /pages/berita/[berita_id] */}
                        <Link className="text-pretty  text-sm " href="/pages/berita/1">Simak! Pengumuman Konser Natal Tahun Ini: 'Mengukir Kebahagiaan Bersama</Link>
                    </div>
                    <div className="py-2 border-b border-black hover:text-primary hover:border-primary">
                        {/* define routes with /pages/berita/[berita_id] */}
                        <Link className="text-pretty  text-sm " href="/pages/berita/1">Panggilan: Gabunglah dalam Kegiatan Sosial Kemanusiaan Bulan Depan</Link>
                    </div>
                    <div className="py-2 border-b border-black hover:text-primary hover:border-primary">
                        {/* define routes with /pages/berita/[berita_id] */}
                        <Link className="text-pretty  text-sm " href="/pages/berita/1">Pemuda Aktif! Persiapan Retreat Rohani 'Menemukan Tujuan Hidup</Link>
                    </div>
                    <div className="py-2 border-b border-black hover:text-primary hover:border-primary">
                        {/* define routes with /pages/berita/[berita_id] */}
                        <Link className="text-pretty  text-sm " href="/pages/berita/1">Acara Minggu Ini: Kebaktian Khusus 'Membangun Kepribadian Kristen</Link>
                    </div>
                </div>
            </aside>
        </>
    )
};

export default BeritaSideBar;