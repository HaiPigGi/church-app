import { Await } from "react-router-dom";
import AuthService from '@/app/api/Auth/route.jsx';

function getJwtToken() {
  return sessionStorage.getItem('jwtToken');
}

// to post new jenismisa
export async function post_jenisMisa(dataPost) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/jenis-misa/`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            Authorization: `bearer ${getJwtToken()}`,
          },
          body: dataPost, //Pass FormData directly as the body //other change to stringyfy to pass just body
        },
      );
      const resData = await res.json();
      return resData;
    } catch (e) {
      console.log('error in post_berita with message : ', e.message);
    }
  }

  export async function get_jenisMisa() {
    try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/jenis-misa/`,
          {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getJwtToken()}` // Make sure to define getJwtToken function
                },
            },
        );

        if (res.ok) {
            const dataRespon = await res.json();
            return dataRespon;
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error at get_Saran:', error.message);
        throw error;
    }
}

export async function delete_jenismisa(id){
  try{
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/jenis-misa/${id}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${getJwtToken()}`
        },
      },
    );
    return res;
  }catch(error){
    console.log('biasa error',error.message)
  }
}

export async function updated_jenismisa(data) {
  try {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${getJwtToken()}`);
    headers.append('Content-Type', 'application/json'); // Tambahkan header Content-Type

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/jenis-misa/${data.id}`, // Sesuaikan endpoint dengan backend Anda
      {
        method: 'PUT',
        mode: 'cors',
        headers: headers,
        body: JSON.stringify(data),
      }
    );

    // Ubah kondisi untuk menangani respons
    if (res.ok) {
      const responseData = await res.json();
      return responseData;
    } else {
      // Tangani kesalahan jika respons tidak berhasil
      const errorData = await res.json();
      throw new Error(errorData.error || 'Gagal memperbarui jenis misa');
    }
  } catch (error) {
    console.error('Biasa error:', error.message);
    throw error; // Re-throw error untuk menangani di tempat pemanggilan
  }
}
