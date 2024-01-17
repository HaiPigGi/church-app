"use client"
import HeroSection from "./herosection"
import JadwalMisaSection from "./jadwalsection"
import BeritaSection from "./beritasection"
import Footer from "@/components/Fragments/Footer"  

function Dashboard(){
    return(
        <>
            <div className="snap-y snap-mandatory h-screen w-full overflow-y-auto">
                    <HeroSection/>
                    <JadwalMisaSection/>
                    <BeritaSection/>
                    <div className="snap-always snap-center">
                        <Footer/>
                    </div>
            </div>      
        </>
    )
};

export default Dashboard;