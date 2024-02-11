export const getAllDokumentasi = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/dokumentasi/`,
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

export const getAllDokumentasiByJenisKegiatan = async (jenisKegiatan) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/dokumentasi/jenis/${jenisKegiatan}`,
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

export const getAllDokumentasiByYear = async (jenisKegiatan, tahun) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/dokumentasi/search/${jenisKegiatan}/${tahun}`,
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
    console.log('Error at getAllDokumentasiByYear with message:', e.message);
    throw e; // Rethrow error untuk menangani error di bagian yang memanggil fungsi ini
  }
};



