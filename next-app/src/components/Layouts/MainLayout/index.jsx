import RootLayout from "@/app/layout";
import Navbar from "@/components/Fragments/Navbar"
import { Suspense } from "react";
function MainLayout({children}) {
    return(
        <div className="relative z-40  h-screen w-full overflow-y-scroll overflow-x-hidden">
            <Suspense>
                <Navbar/>
                {children}
            </Suspense>
        </div>
    )
}

export default MainLayout;