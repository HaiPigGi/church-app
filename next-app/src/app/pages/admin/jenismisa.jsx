'use client'
import { useState,useEffect,Suspense } from 'react';
import { post_jenisMisa } from '@/app/api/Admin/jenismisa/routes';
import { get_jenisMisa } from '@/app/api/Admin/jenismisa/routes';
import { delete_jenismisa } from '@/app/api/Admin/jenismisa/routes';
import { updated_jenismisa } from '@/app/api/Admin/jenismisa/routes';


export default function Jenismisa() {
  const [posisi, setPosisi] = useState({
    jenis : '',
});
  const [jenisMisaList, setJenisMisaList] = useState([]);

  const handleCreate = (e) => {
    const { name, value }= e.target;
    if (posisi) {
      setPosisi({...posisi, [name]: value });
    }
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    simpanData(posisi);
    setPosisi({
      jenis:''
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get_jenisMisa();
        setJenisMisaList(result.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (id) => {
    try {
      // Meminta pengguna untuk memasukkan posisi baru
      const newPosisi = prompt('Masukkan posisi baru:');
      console.log('hasil : ',newPosisi !== null && newPosisi.trim() !== '')
  
      // Memeriksa apakah posisi baru tidak kosong
      if (newPosisi !== null && newPosisi.trim() !== '') {
        
        // Membuat objek data yang akan diperbarui
        const updatedData = { id, posisi: newPosisi.trim() };
  
        // Mengirim permintaan pembaruan ke backend
        const res = await updated_jenismisa(updatedData);
  
        // Memeriksa status respons dari backend
        if (res.status === 201) {
          // Jika pembaruan berhasil, tampilkan pesan sukses
          alert('Data berhasil diupdate');
        } else {
          // Jika pembaruan gagal, tampilkan pesan kesalahan
          alert('Gagal mengupdate jenis misa');
          console.log("hasilnya : ",res)
        }
      } else {
        // Jika posisi baru kosong atau pengguna membatalkan prompt, tidak melakukan apa-apa
        console.log('Input posisi baru kosong atau dibatalkan.');
      }
    } catch (error) {
      // Tangani kesalahan yang terjadi selama pembaruan data
      console.log('Error:', error.message);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const res = await delete_jenismisa(id);
      if (res.ok) {
        alert('Berhasil menghapus jenis misa');
        getAlljenismisa();
      } else {
        alert('Gagal menghapus jenis misa');
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const getAlljenismisa = async () => {
    // calling getMembersData for accessing the api
    let res = await get_jenisMisa();
    setJenisMisaList(res.data);
    return;
  };


  async function simpanData(datanya) {
    try {
        const data = datanya;
        console.log('hasil: ', data);
        const post_data = new FormData();
        // Anda perlu menentukan kunci dan nilai yang akan di-append ke FormData
        post_data.append('jenis', data.jenis);

        const res = await post_jenisMisa(post_data);
        console.log("hasilnya syng : ", res);
        // After successfully posting the new data, you can fetch the updated list of data

        const updatedData = await get_jenisMisa();
        setJenisMisaList(updatedData.data);
        console.log("hasilnya : ",updatedData)
    } catch (error) {
        console.log('error mya mas : ', error);
    }
  }


  return (
    <div>
      <div className="container mx-auto mt-8 p-8 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-4 text-center min-[360px]:max-[765px]:ml-[-3rem]">
            Input Jenis Misa
          </h1>
          <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
            <input
              type="text"
              name='jenis'
              placeholder="Posisi"
              className="p-2 border border-gray-300 rounded-md flex-1 min-[360px]:max-[765px]:w-[4rem]"
              value={posisi.jenis}
              onChange={handleCreate}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              
            >
              Create
            </button>
          </form>
        </div>

        <div className="max-w-3xl mx-auto mt-8">
          <h1 className="text-3xl font-semibold mb-4 text-center">
            Data Jenis Misa 
          </h1>
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Posisi</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>

            <Suspense fallback={<loading/>}>
            {jenisMisaList.length > 0  &&(
              <tbody className="text-center">
              {jenisMisaList.map((item,index) => (
                <tr key={index} className="border-t mx-auto">
                  <td className="py-2 px-4">{item.jenis}</td>
                  <td className="py-2 px-4 flex justify-center space-x-5">
                    <button
                    onClick={()=> handleUpdate(item.jenis_misa_id)}
                      className="text-blue-500 underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.jenis_misa_id)}
                      className="text-red-500 underline"
                      >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            )}

            </Suspense>
          </table>
        </div>
      </div>
    </div>
  );
}



