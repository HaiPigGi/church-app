import AuthService from '@/app/api/Auth/route.jsx';

// To get the JWTTOKEN from session storage.
function getJwtToken() {
  return sessionStorage.getItem('jwtToken');
}

// to get all data from server
export async function get_Position() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/positions/`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
          Authorization: `bearer ${getJwtToken()}`,
        },
      },
    );
    return res;
  } catch (e) {
    console.log('error in get_AllBerita with message : ', e.message);
  }
}
export async function post_position(postData) {
  console.log('cek data postData ', postData);
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/positions/`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `bearer ${getJwtToken()}`,
        },
        body: postData,
      },
    );

    return res;
  } catch (e) {
    console.log('error in create position : ', e.message);
  }
}

export async function update_position(data) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/positions/${data.position_id}`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
          'X-CSRF-TOKEN': AuthService().CSRF_token(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    return res;
  } catch (e) {
    console.error('Error at update_position:', e.message);
  }
}

// Assume you have a function in your API file for deleting a position
export async function delete_position(position_id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/positions/${position_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
          'X-CSRF-TOKEN': AuthService().CSRF_token(),
        },
      },
    );

    return res;
  } catch (e) {
    console.error('Error at delete_position:', e.message);
    throw e;
  }
}
