import Navbar from "@/components/Fragments/Navbar";
import BeritaSideBar from "@/components/Fragments/SideBar";
import Footer from "@/components/Fragments/Footer";

function BeritaLayout({children}) {
    return(
        <main className="relative w-full h-auto pt-5">
            <Navbar/>
            <section className="grid md:grid-cols-4  w-full h-screen pt-12">
                { children }
                <BeritaSideBar/>
            </section>
            <Footer/>
        </main>
    )
};

export default BeritaLayout;