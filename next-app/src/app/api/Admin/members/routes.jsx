import AuthService from '../../Auth/route';

export async function getMembersData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/members`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
          Authorization: `bearer ${AuthService().getSession()}`,
        },
      },
    );
    return res;
  } catch (e) {
    console.log('Error a getMembersData : ', e.message);
  }
}

export async function postMembersData(data) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/members`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `bearer ${AuthService().getSession()}`,
        },
        body: data,
      },
    );
    return res;
  } catch (e) {
    console.log('Error at postMembersData with message : ', e.message);
  }
}

export async function deleteMemberData(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/members/${id}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Authorization: `bearer ${AuthService().getSession()}`,
        },
      },
    );
    return res;
  } catch (e) {
    console.log('error at deleteMemberData with message : ', e.message);
  }
}
