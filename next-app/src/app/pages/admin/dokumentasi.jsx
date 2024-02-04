import Image from "next/image";
export default function Dokumentasi(){
return(
    <div className="pt-20 flex flex-col items-center justify-center h-[60%] w-auto ">
        <label className="font-bold text-3xl mb-2 min-[360px]:max-[765px]:text-xl">Tambahkan Dokumentasi</label>
        <form className=" shadow-2xl opacity-50 h-[82vh] w-[100vh] p-5 ">
            {/* gambar */}
            <div className="flex flex-col mb-3">
                <label className="text-red-700 font-mono mb-2 ">Image :</label>
                    <input
                    type="file"
                    className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100
                    min-[360px]:max-[765px]:w-[33vh]"
                    placeholder="Image"
                    required
                />
            </div>
            {/* tahun */}
            <div className="flex flex-col mb-3">
            <label className="text-red-700 font-mono mb-2 ">Tahun Kegiatan :</label>
                    <input
                    type="date"
                    id="tahunInput"
                    className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100
                    min-[360px]:max-[765px]:w-[33vh]"
                    placeholder="Tahun Kegiatan"
                    required
                />
                
            </div>
            {/* nama kegiatan */}
            <div className="flex flex-col mb-3">
            <label className="text-red-700 font-mono mb-2 ">Jenis Kegiatan :</label>
            <select name="hari" className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100
                min-[360px]:max-[765px]:w-[33vh] ">
                    <option value="select">select</option>
                    <option value="natal">Natal</option>
                    <option value="paskah">Paskah</option>
                </select>
            </div>
            <div className="flex justify-center mb-3">
                <button 
                className="border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200"
                >Submit</button>
            </div>
        </form>
    </div>
)
}


