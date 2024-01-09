"use client"
import HeroSection from "./herosection"
import JadwalMisaSection from "./jadwalsection"
import BeritaSection from "./beritasection"
import Footer from "@/components/Fragments/Footer"  

function Dashboard(){
    return(
        <>
            <div className=" bg-hero bg-fixed bg-center bg-cover bg-no-repeat ">
                    <HeroSection/>
                    <JadwalMisaSection/>
                    <BeritaSection/>
            </div>      
            <Footer/>
        </>
    )
};

export default Dashboard;