
import BeritaSection from "./beritasection";
import HeroSection from "./herosection";
import JadwalMisaSection from "./jadwalsection";
import MainLayout from "@/components/Layouts/MainLayout";
import Footer from "@/components/Fragments/Footer";
import Dashboard from "./Dashboard"

function PageHome(){
    return(
        <MainLayout>
            <Dashboard/>
        </MainLayout>
    )
};

export default PageHome;