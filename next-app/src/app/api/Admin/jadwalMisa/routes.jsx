const token = sessionStorage.getItem('jwtToken');

export async function get_JadwalMisa() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/jadwal-misa/`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      },
    );
    if (res.ok) {
      const responseData = await res.json();
      return responseData;
    }
  } catch (e) {
    console.log('error at getJadwalMisa with message : ', e.message);
  }
}

export async function get_JadwalMisaid(jadwalID) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/jadwal-misa/${jadwalID}`,
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
    if (res.ok) {
      return responseData;
    }
    console.log(
      'response error at get_JadwalMisaid with message : ',
      responseData.error,
    );
  } catch (e) {
    console.log('error at get_JadwalMisaid with message : ', e.message);
  }
}

export async function post_JadwalMisa(dataJadwal) {
  console.log('isinya : ', dataJadwal);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/jadwal-misa/`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `bearer ${token}`,
        },
        body: dataJadwal,
      },
    );
    const responseData = await res.json();
    if (res.ok) {
      return responseData.message;
    }
    return responseData.error;
  } catch (e) {
    console.log('Error at post_JadwalMisa with message : ', e.message);
  }
}

export async function put_JadwalMisa(jadwalID, dataJadwal) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/jadwal-misa/${jadwalID}`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify(dataJadwal),
      },
    );
    const responseData = await res.json();
    if (res.ok) {
      return responseData.message;
    }
    return responseData.error;
  } catch (e) {
    console.log('error at put_JadwalMisa with message : ', e.message);
  }
}

export async function delete_JadwalMisa(id){
  try{
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/jadwal-misa/${id}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      },
    );
    return res;
  }catch(error){
    console.log('biasa error',error.message)
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
          'content-type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      },
    );
    if (res.ok) {
      const responseData = await res.json();
      return responseData;
    }
  } catch (e) {
    console.log('error at get_jenisMisa with message : ', e.message);
  }
}
