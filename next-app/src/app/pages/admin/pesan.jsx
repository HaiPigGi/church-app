'use client'
import React, { useState, useEffect } from 'react';
import { get_Saran } from '@/app/api/Admin/saran/route';


export default function Pesan() {

  const [saranList,setSaran] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get_Saran();
        console.log('hasilnya :',response)
          setSaran(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData(); // Panggil fungsi fetchData saat komponen dimuat
  }, []);
  
 

  return (
    <div>
      <div className='min-[360px]:max-[765px]:hidden'>
      <h1 className="pt-7 pb-7 text-2xl font-semibold flex-1 text-center ">Pesan Dan Kritik</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pengirim</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Pengirim</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pesan</th>
          </tr>
        </thead>
          {saranList?.length > 0 &&(
           <tbody className="bg-white divide-y divide-gray-200">
            {saranList?.map((row,index) => (
              <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{row.full_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.email}</td>
              <td className="px-6 py-4 whitespace-wrap" style={{ lineHeight: '1.4', maxHeight: '4.2em', overflow: 'hidden' }}>
              {row.message}
              </td>
              </tr>
              ))}
            </tbody>
          )}
      </table>
    </div>

       {/* for mobile */}
       <div className='min-[765px]:hidden'>
        <h1 className="pt-7 pb-7 text-2xl font-semibold flex-1 text-center ">Pesan Dan Kritik</h1>
        <div>
          {saranList?.map((row, i) => (
            <tr key={i}>
              <label className="px-6 py-4 whitespace-nowrap font-bold text-lg text-red-500">{row.name}</label>
              <p className="px-6 py-4 whitespace-wrap font-Open Sans" style={{ lineHeight: '1.4', maxHeight: '4.2em', overflow: 'hidden' }}>
                {row.message}
              </p>
            </tr>
          ))}
        </div>
      </div>
    </div>
   
  );
}
