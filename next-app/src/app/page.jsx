'use client';
import PageHome from './pages/home/page';
import { useEffect,useState } from 'react';
import Loading from '@/components/Fragments/Loading/loading';
import { useAppSelector } from '@/lib/hook';

export default function Home() {
  //get the AuthStatus
  const AuthStatus = useAppSelector((state) => state.session.status);
  const [displayLoading, setDisplayLoading] = useState(true);

  //execute function Load whenever the AuthStatus changed
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDisplayLoading(false);
    }, 2000); // Set waktu yang diinginkan (dalam milidetik)

    // Membersihkan timer saat komponen dibongkar (unmounted)
    return () => clearTimeout(timeoutId);
  }, [AuthStatus]);

  // function for Loading
  const Load = () => {
    if (displayLoading) {
      // Menampilkan animasi loading selama 3 detik
      return <Loading />;
    }
    return <PageHome />;
  };

  useEffect(() => {
    Load();
  }, [AuthStatus]);

  // function for Loading

  return <Load />;
}
