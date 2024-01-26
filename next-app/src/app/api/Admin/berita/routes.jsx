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
  try {
    console.log("cek image store : ", dataPost.get('image'));
    console.log(dataPost.get('title'));
    console.log(dataPost.get('content'));
    console.log(dataPost.get('event'));
    console.log('data post at POST_BERITA : ', dataPost);
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
        status: 'success',
        message: 'Data Successfully Added',
      };
    } else if (res.status === 422) {
      return {
        status: 'error',
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

// to update berita based on berita_id
export async function put_berita(dataPost) {
  // Extract title, content, event, and berita_id from FormData
  const image = dataPost.get('image');
  const title = dataPost.get('title');
  const content = dataPost.get('content');
  const event = dataPost.get('event');
  const berita_id = dataPost.get('berita_id');

  console.log("cek image update : ",image);
  console.log("cek title update : ",title);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/berita/${berita_id}`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${getJwtToken()}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
          event: event,
          image: image,
        }),
      },
    );

    const responseData = await res.json();
    return responseData;
  } catch (e) {
    console.log('Error in put_berita with message:', e.message);
  }
}

// to delete berita based on id berita
export async function delete_berita(data) {
  //
  try {
    const res = fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/berita/${data.berita_id}`,
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
