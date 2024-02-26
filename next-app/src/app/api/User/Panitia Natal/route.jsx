export const getAllDataPanitiaNatal = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/member`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return res;
    } catch (e) {
      console.log('error at getAllDokuemntasi with message : ', e.message);
    }
  };
  