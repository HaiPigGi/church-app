

export default function jadwal(){

    return(
        <div className="pt-10 flex flex-col items-center justify-center h-auto w-auto">
            <h1 className="font-bold text-3xl mb-2">Tambah Jadwal Misa</h1>
            <form className="shadow-2xl opacity-50 h-[82vh] w-[100vh] p-10  ">
                <div className="flex flex-col mb-3">
                    <input
                    type="text"
                    className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
                    placeholder="Jenismisa"
                    required
                />
                </div>

                <div className="flex flex-col mb-3">
                <label className="text-red-700 font-mono mb-2 ">Hari Misa</label>
                <select id="hari" name="hari" className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100">
                    <option value="senin">select</option>
                    <option value="senin">Senin</option>
                    <option value="selasa">Selasa</option>
                    <option value="rabu">Rabu</option>
                    <option value="kamis">Kamis</option>
                    <option value="jumat">Jumat</option>
                    <option value="sabtu">Sabtu</option>
                    <option value="minggu">Minggu</option>
                </select>
                </div>
                
                <div className="flex flex-col mb-3">
                    <label className="text-red-700 font-mono mb-2 ">Waktu Mulai</label>
                    <input
                    type="time"
                    className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
                    required
                />
                </div>
                <div className="flex flex-col mb-3">
                    <label className="text-red-700 font-mono mb-2 ">Waktu Selesai</label>
                    <input
                    type="time"
                    className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
                    required
                />
                </div>
                <div className="flex justify-center mb-3">
                 <button className="border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200">
                    save
                 </button>
                </div>
            </form>
        </div>
    )
}