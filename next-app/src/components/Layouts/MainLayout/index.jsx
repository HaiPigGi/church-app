import RootLayout from "@/app/layout";
import Navbar from "@/components/Fragments/Navbar"
function MainLayout({children}) {
    return(
        <div className="relative z-40 snap-y snap-mandatory h-screen w-full overflow-y-scroll overflow-x-hidden">
            <Navbar/>
            {children}
        </div>
    )
}

export default MainLayout;