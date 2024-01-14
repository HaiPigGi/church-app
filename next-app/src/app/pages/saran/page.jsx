import MainLayout from "@/components/Layouts/MainLayout";
import Footer from "@/components/Fragments/Footer";

export default function saran() {
  return (
  <MainLayout>
    <div className="bg-white mt-[5rem] flex justify-center items-center">
        <h1 className="font-bold text-[50px] text-center text-black text-shadow1 mt-3">Saran Dan Kritik</h1>
    </div>
    <div className="flex">
        <div className="absolute justify-center items-center">
            <input 
            type="text "
            className="w-56 h-20 border-slate-950 " 
            placeholder="Email"/>

        </div>
    </div>
  </MainLayout>
  )
}
