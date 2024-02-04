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