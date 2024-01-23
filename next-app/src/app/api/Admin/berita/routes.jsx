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
    const responseData = await res.json();
    if (res.status == 200) {
      return responseData;
    }

    console.log(responseData.error);
    return;
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
    const responseData = await res.json();
    if (res.status == 200) {
      return responseData;
    }
    console.log(responseData.error);
    return;
  } catch (e) {
    console.log('error in get_beritaID with message : ', e.message);
  }
}

// to post new berita
export async function post_berita(dataPost) {
  console.log("cek data post : ", dataPost);
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

    console.log(res.status);

    if (res.status === 200) {
      return {
        message: 'Data Successfully Added',
      };
    } else if (res.status === 422) {
      return {
        message: 'Data is not valid',
      };
    } else {
      return {
        message: res.status,
      };
    }
  } catch (e) {
    console.log('error in post_berita with message : ', e.message);
  }
}


// to update bertia based on id berita
export async function put_berita(dataPost) {
  try {
    const res = fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/berita/${dataPost.id}`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          Authorization: `bearer ${getJwtToken()}`,
        },
        body: JSON.stringify(dataPost),
      },
    );
    const responseData = await res.json();
    return responseData;
  } catch (e) {
    console.log('error in put_berita with message : ', e.message);
  }
}

// to delete berita based on id berita
export async function delete_berita(beritaID) {
  //
  try {
    const res = fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/berita/${beritaID}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'X-CSRF-TOKEN': csrf_token,
        },
      },
    );
    const responseData = await res.json();
    return responseData;
  } catch (e) {
    console.log('error in delete_berita with message : ', e.message);
  }
}
