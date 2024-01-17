import React from 'react';

export default function Pesan() {
  const data = [
    { name: 'Pengirim 1', email: 'pengirim1@example.com', message: 'Pesan 1' },
    {
      name: 'Pengirim 2',
      email: 'pengirim2@example.com',
      message: 'Lorem ipsum dolor sit amet consectetur  !',
    },
  ];

  return (
    <div>
      <h1 className="pt-7 pb-7 text-2xl font-semibold flex-1 text-center">Pesan Dan Kritik</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pengirim</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Pengirim</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pesan</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr key={i}>
              <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.email}</td>
              <td className="px-6 py-4 whitespace-wrap" style={{ lineHeight: '1.4', maxHeight: '4.2em', overflow: 'hidden' }}>
                {row.message}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
