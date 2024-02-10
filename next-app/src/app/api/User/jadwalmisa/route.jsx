

export async function get_jadwal() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/jadwal-misa/`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
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