import RootLayout from "@/app/layout";
import Navbar from "@/components/Fragments/Navbar"
function MainLayout({children}) {
    return(
        <RootLayout>
            <Navbar/>
            {children}
        </RootLayout>
    )
}

export default MainLayout;