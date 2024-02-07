import AuthService from '@/app/api/Auth/route.jsx';

// To get the JWTTOKEN from session storage.
function getJwtToken() {
  return sessionStorage.getItem('jwtToken');
}

// to get all data berita from server
export async function get_AllBerita() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/berita/`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
          Authorization: `bearer ${getJwtToken()}`,
        },
      },
    );
    return res;
  } catch (e) {
    console.log('error in get_AllBerita with message : ', e.message);
  }
}

// to get berita based on id
export async function get_beritaID(beritaID) {
  try {
    const res = fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/berita/${id}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
          Authorization: `bearer ${getJwtToken()}`,
        },
      },
    );
    return res;
  } catch (e) {
    console.log('error in get_beritaID with message : ', e.message);
  }
}

// to post new berita
export async function post_berita(dataPost) {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/berita/store`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `bearer ${getJwtToken()}`,
        },
        body: dataPost, //Pass FormData directly as the body //other change to stringyfy to pass just body
      },
    );
    return resData;
  } catch (e) {
    console.log('error in post_berita with message : ', e.message);
  }
}

// Updated put_berita function
export async function put_berita(idBerita, formData) {
  console.log('cek isi form data di put_berita : ', formData);

  try {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${getJwtToken()}`);
    headers.append('X-CSRF-TOKEN', AuthService().CSRF_token());
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/berita/${idBerita}`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: headers,
        body: JSON.stringify(formData),
      },
    );
    return responseData;
  } catch (e) {
    console.log('Error in put_berita with message:', e.message);
    throw e; // rethrow the error to handle it in the calling function
  }
}

// to delete berita based on id berita
export async function delete_berita(data) {
  //
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/berita/${data.berita_id}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Authorization: `bearer ${getJwtToken()}`,
        },
      },
    );

    return responseData;
  } catch (e) {
    console.log('error in delete_berita with message : ', e.message);
  }
}
