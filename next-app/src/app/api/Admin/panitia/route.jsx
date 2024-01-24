// api/panitia/route.jsx
// To get the JWTTOKEN from session storage.
function getJwtToken() {
    return sessionStorage.getItem('jwtToken');
  }
  
  export async function toggleView(newStatus) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/admin/panitia/toggle-status`,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'content-type': 'application/json',
            Authorization: `bearer ${getJwtToken()}`,
          },
          body: JSON.stringify({ newStatus }), // Send the new status to the server
        },
      );
      const data = await response.json();
      return data; // Return data instead of updating state directly
    } catch (error) {
      console.error('Error toggling status:', error);
      throw error; // Rethrow the error for the component to handle
    }
  }
  
  export async function fetchPanitiaStatus() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/panitia/status`,
      );
      const data = await response.json();
      return data; // Return data instead of updating state directly
    } catch (error) {
      console.error('Error fetching Panitia status:', error);
      throw error; // Rethrow the error for the component to handle
    }
  }
  