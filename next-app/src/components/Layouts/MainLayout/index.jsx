import RootLayout from "@/app/layout";
import Navbar from "@/components/Fragments/Navbar"
import { Suspense } from "react";
function MainLayout({children}) {
    return(
        <div className="relative z-40  h-full w-full overflow-y-auto overflow-x-hidden">
            <Suspense>
                {children}
            </Suspense>
        </div>
    )
}

export default MainLayout;