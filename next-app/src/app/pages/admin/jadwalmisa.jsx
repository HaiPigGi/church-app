'use client'
import {  useState } from "react"
import { post_JadwalMisa } from "@/app/api/Admin/jadwalMisa/routes";


export default function jadwal(){

    const [Jadwa,setJadwal]=useState({
        hari:'senin',
        waktu_mulai:'12:12',
        waktu_selesai:'12:12',
        jenis_misa_id:'sadas'
    });

    const handleInput=(e)=>{
        const { name, value }= e.target;
        // console.log("Name:", name, "Value:", value); // Tambahkan ini untuk debugging
            setJadwal({
                ...Jadwa,
                [name]: value
            });
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        simpanJadwal(Jadwa)

        // setJadwal({
        //     hari:'',
        //     waktu_mulai:'',
        //     waktu_selesai:'',
        //     jenis_misa_id:''
        // });
    };

    async function simpanJadwal(datanya){
        try{
            console.log('data yang di simpan: ',datanya);
            const data = datanya
            console.log('data yang di simpan: ',data);
            console.log('hari', Jadwa.hari);
            console.log('waktu mulai', Jadwa.waktu_mulai);
            console.log('waktu selesai', Jadwa.waktu_selesai);
            console.log('jenis misa', Jadwa.jenis_misa_id);

            const post_data= new FormData();

            post_data.append('hari',data.hari)
            post_data.append('waktu_mulai',data.waktu_mulai)
            post_data.append('waktu_selesai',data.waktu_selesai)
            post_data.append('jenis_misa_id',data.jenis_misa_id)

            const DATA_JSON = {}
            for (const pd of post_data.entries()) {
                DATA_JSON[pd[0]] = pd[1]
              }

            const res = await post_JadwalMisa(DATA_JSON);
            console.log("hasilnya syng : ",res)

        }catch(error){
            console.error("biasalah ada error dikit",error)
        }
    }

    return(
        <div className="pt-10 flex flex-col items-center justify-center h-auto w-auto ">
            <h1 className="font-bold text-3xl mb-2 min-[360px]:max-[765px]:text-xl">Tambah Jadwal Misa</h1>
            <form onSubmit={handleSubmit} className="shadow-2xl opacity-50 h-[82vh] w-[100vh] p-5 min-[360px]:max-[765px]:w-[40vh] min-[360px]:max-[765px]:h-[88vh]  ">
                <div className="flex flex-col mb-3">
                    <input
                    type="text"
                    className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100
                    min-[360px]:max-[765px]:w-[33vh]"
                    placeholder="Jenismisa"
                    required
                    name='jenis_misa_id'
                    value={Jadwa.jenis_misa_id}
                    onChange={handleInput}
                />
                </div>

                <div className="flex flex-col mb-3">
                <label className="text-red-700 font-mono mb-2 ">Hari Misa</label>
                <select name="hari" className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100
                min-[360px]:max-[765px]:w-[33vh] " value={Jadwa.hari} onChange={handleInput} >
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
                    name="waktu_mulai"
                    className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100
                    min-[360px]:max-[765px]:w-[33vh]"
                    required
                    value={Jadwa.waktu_mulai}
                    onChange={handleInput}
                />
                </div>
                <div className="flex flex-col mb-3">
                    <label className="text-red-700 font-mono mb-2 ">Waktu Selesai</label>
                    <input
                    name="waktu_selesai"
                    type="time"
                    className="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100
                    min-[360px]:max-[765px]:w-[33vh]"
                    required
                    value={Jadwa.waktu_selesai}
                    onChange={handleInput}
                />
                </div>
                <div className="flex justify-center mb-3 min-[360px]:max-[765px]:justify-start min-[360px]:max-[765px]:ml-16">
                 <button type="submit" className="border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200">
                    save
                 </button>
                </div>
            </form>
        </div>
    )
}