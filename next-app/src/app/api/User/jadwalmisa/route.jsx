import AuthService from "../../Auth/route";

export async function get_jadwal() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/jadwal-misa`,
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'content-type': 'application/JSON',
        },
      },
    )
    if(res.ok){
      return await res.json();
    }    
  } catch (e) {
    console.log('error at getJadwalMisa with message : ', e.message);
  }
}
