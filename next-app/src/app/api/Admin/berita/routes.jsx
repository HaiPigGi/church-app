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
    return responseData;
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
    const resData = await res.json();
    return resData;
  } catch (e) {
    console.log('error in post_berita with message : ', e.message);
  }
}

const convertImageToDataURL = async (image) => {
  if (image instanceof Blob || image instanceof File) {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.readAsDataURL(image);
    });
  } else if (
    typeof image === 'object' &&
    image['Illuminate\\Http\\UploadedFile']
  ) {
    // If image is an object with the structure {"Illuminate\\Http\\UploadedFile": "C:\\xampp\\tmp\\php40B6.tmp"}
    const filePath = image['Illuminate\\Http\\UploadedFile'];
    const blob = await fetch(filePath).then((response) => response.blob());
    return convertImageToDataURL(blob);
  } else if (typeof image === 'string') {
    // If image is a string, assume it's a file path and fetch it
    const response = await fetch(image);
    const blob = await response.blob();

    return convertImageToDataURL(blob);
  } else {
    throw new Error('Invalid image type');
  }
};

// Updated put_berita function
export async function put_berita(dataPost, idBerita) {
  console.log(dataPost.get('image'));
  console.log(dataPost.get('title'));
  console.log(dataPost.get('content'));
  console.log(dataPost.get('event'));
  // const data = {
  //   title: dataPost.get('title'),
  //   content: dataPost.get('content'),
  //   event: dataPost.get('event'),
  // };
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/berita/${idBerita}`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `bearer ${getJwtToken()}`,
        },
        body: dataPost,
      },
    );

    const responseData = await res.json();
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
    const responseData = await res.json();
    console.log(responseData);
    return responseData;
  } catch (e) {
    console.log('error in delete_berita with message : ', e.message);
  }
}
