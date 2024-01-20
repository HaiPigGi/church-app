const beritaServices = () => {
  const token = sessionStorage.getItem('jwtToken');
  async function get_AllBerita() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/berita/`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'content-type': 'application/json',
            Authorization: `bearer ${token}`,
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

  async function get_beritaID(beritaID) {
    try {
      const res = fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/berita/${id}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'content-type': 'application/json',
            Authorization: `bearer ${token}`,
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

  async function post_berita(dataPost) {
    try {
      const res = fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/berita/store`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            Authorization: `bearer ${token}`,
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

  async function put_berita(dataPost) {
    try {
      const res = fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/berita/${dataPost.id}`,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            Authorization: `bearer ${token}`,
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

  async function delete_berita(beritaID) {
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
};
