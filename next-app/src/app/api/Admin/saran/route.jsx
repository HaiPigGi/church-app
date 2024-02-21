
// To get the JWTTOKEN from session storage.
function getJwtToken() {
    return sessionStorage.getItem('jwtToken');
  }
  

  export async function get_Saran() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/saran/`,
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

export async function delete_pesan(id){
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/saran/${id}`,
            {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${getJwtToken()}` // Make sure to define getJwtToken function
                },
            },
        );
        return res;
    }catch(error){
      console.log('biasa error',error.message)
    }
  }