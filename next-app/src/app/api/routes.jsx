import AuthService from './Auth/route';
export async function get_AllBerita_user() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/berita/getAllBerita`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
          'X-CSRF-TOKEN': AuthService().CSRF_token(),
        },
      },
    );
    const responseData = await res.json();
    if (res.status == 200) {
      return responseData;
    } else {
      return;
    }
  } catch (e) {
    console.log('error at get_AllBerita_user with message : ', e.message);
  }
}

export async function get_BeritaBasedID_user(beritaID) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/berita/getAllBerita/${beritaID}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
          'X-CSRF-TOKEN': AuthService().CSRF_token(),
        },
      },
    );
    const resDat = await res.json();
    if (res.status == 200) {
      return resDat;
    } else {
      return resDat.error;
    }
  } catch (e) {
    console.log('Error at get_BeritaBasedID_user with message : ', e.message);
  }
}
