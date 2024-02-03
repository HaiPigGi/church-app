import AuthServices from '@/app/api/Auth/route';

const get_session = () => {
  return sessionStorage.getItem('jwtToken');
};

export async function get_AllOrganitations() {
  const token = get_session();
  if (token) {
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/organitations/`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'content-type': 'application/json',
            'X-CSRF-TOKEN': AuthServices().CSRF_token(),
            Authorization: `bearer ${token}`,
          },
        },
      );
      return res;
    } catch (e) {
      console.log('error at get_AllOrganitations with message : ', e.message);
    }
  }
}

export async function get_OrganitationsBasedID(organitationID) {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/organitations/${organitationID}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
          'X-CSRF-TOKEN': AuthServices().CSRF_token(),
        },
      },
    );
    res = await res.json();
    if (res.status == 200) {
      return res;
    }
    return res.error;
  } catch (e) {
    console.log('error at get_OrganitationsBasedID with message : ', e.message);
  }
}

export async function post_Organitation(dataOrganitations) {
  const token = get_session();
  if (token) {
    console.log(token);
    console.log(dataOrganitations);
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/organitations/store`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            Authorization: `bearer ${token}`,
          },
          body: dataOrganitations,
        },
      );
      res = await res.json();
      console.log(res);
      if (res.status == 201) {
        return res;
      }
      return res.error;
    } catch (e) {
      console.log('error at post_Organitation with message : ', e.message);
    }
  }
}

export async function put_Organitation(organitationsID, organitationData) {
  const token = get_session();
  if (token) {
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/organitations/${organitationsID}`,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            Authorization: `bearer ${token}`,
          },
          body: organitationData,
        },
      );
      res = await res.json();
      if (res.status == 200) {
        return res;
      }
      return res.error;
    } catch (e) {
      console.log('Error at put_Organitation with message : ', e.message);
    }
  }
}

export async function delete_Organitation(organitationsID) {
  const token = get_session();
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/organitations/${organitationsID}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      },
    );
    return res;
  } catch (e) {
    console.log('error at delete_Organitations with message : ', e.message);
  }
}
