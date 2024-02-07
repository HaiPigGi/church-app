function getJwtToken() {
  return sessionStorage.getItem('jwtToken');
}

export async function post_Images(data) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/dokumentasi/`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
        },
        body: data,
      },
    );

    if (res.ok) {
      const dataRespon = await res.json();
      return dataRespon;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.log('biasalah gak bisa post data : ', error.message);
  }
}

export async function get_dokumentasi() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/dokumentasi/`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getJwtToken()}`, // Make sure to define getJwtToken function
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
    console.log('biasalah ada error sedikit : ', error);
  }
}
