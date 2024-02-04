'use client';
import { useState, useEffect } from 'react';
import { FaAnglesLeft } from 'react-icons/fa6';
import Out from '@/app/pages/admin/out';
import Pesan from '@/app/pages/admin/pesan';
import Organisasi from './organisasi';
import Posisi from './posisi';
import Member from './member';
import Berita from './berita';
import Hidden from './hiddenView/hidden';
import Jadwal from './jadwalmisa';
import Jenismisa from './jenismisa';
import Dokumentasi from './dokumentasi';
import WithAuth from '@/app/api/Auth/withAuth.js';
import { useAppSelector } from '@/lib/hook';
import Loading from '@/components/Fragments/Loading/loading';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@radix-ui/react-scroll-area';


function Admin() {
  const [open, setopen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('');
  const [loading, setLoading] = useState();
  const status = useAppSelector((state) => state.session.status);

  const Menus = [
    {
      title: 'Dashboard',
      src: 'Home',
      onClick: () => handleMenuClick('Dashboard'),
    },
    { title: 'Inbox', src: 'Chat(1)', onClick: () => handleMenuClick('Inbox') },
    {
      title: 'organisasi',
      src: 'Customer(1)',
      gap: true,
      onClick: () => handleMenuClick('organisasi'),
    },
    {
      title: 'Posisi',
      src: 'Social',
      onClick: () => handleMenuClick('Posisi'),
    },
    {
      title: 'Member',
      src: 'id (1)',
      onClick: () => handleMenuClick('Member'),
    },
    {
      title: 'Jadwal',
      src: 'calendar (1)',
      gap: true,
      onClick: () => handleMenuClick('Jadwal'),
    },
    {
      title: 'Jenismisa',
      src: 'calendar (1)',
      gap: false,
      onClick: () => handleMenuClick('Jenismisa'),
    },
    {
      title: 'Hidden',
      src: 'view (1)',
      onClick: () => handleMenuClick('Hidden'),
    },
    {
      title: 'Dokumentasi',
      src: 'Chart_fill',
      gab: true,
      onClick: () => handleMenuClick('Dokumentasi'),
    },
    {
      title: 'Berita',
      src: 'alert (1)',
      gab: true,
      onClick: () => handleMenuClick('Berita'),
    },
    {
      title: 'Logout',
      src: 'logout (1)',
      onClick: () => handleMenuClick('Logout'),
    },
  ];

  const handleMenuClick = (title) => {
    setActiveMenu(title);
  };

  const Dashboard = () => (
    <h1 className="p-7 text-2xl font-semibold flex-1 h-screen text-center">
      Dashboard page
    </h1>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Inbox':
        return <Pesan />;
      case 'organisasi':
        return <Organisasi />;
      case 'Posisi':
        return <Posisi />;
      case 'Member':
        return <Member />;
      case 'Jadwal':
        return <Jadwal />;
      case 'Jenismisa':
        return <Jenismisa />;
      case 'Hidden':
        return <Hidden />;
      case 'Dokumentasi':
        return <Dokumentasi />;
      case 'Berita':
        return <Berita />;
      case 'Logout':
        return <Out />;
      default:
        return null; // or a default component if no match
    }
  };

  return (
    <div className="flex">
      <ScrollArea
        className={` ${open ? 'w-72' : 'w-20'} p-3 pt-5 h-auto duration-300 bg-secondary relative `}
      >
        <FaAnglesLeft
          className={` absolute cursor-pointer -right-3 top-9 w-7 border-2 border-black rounded-full ${!open && 'rotate-180'}`}
          onClick={() => setopen(!open)}
        />

        <div className="flex gap-x-4 items-center">
          <img
            src="/img/th-removebg-preview (1).png"
            className={`w-14 h-14 cursor-pointer duration-500`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-300 ${!open && 'scale-0'}`}
          >
            Admin
          </h1>
        </div>

        <ul className="pt-5">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`text-white text-sm flex items-center gab-x-4 cursor-pointer p-2 hover:bg-orange-300 rounded-md 
                    ${menu.gap ? 'mt-6' : 'mt-1'} 
                    ${index === 0 && 'bg-orange-300'}
                    ${menu.title === activeMenu && 'bg-orange-300'}`}
              onClick={menu.onClick}
            >
              <img
                src={`/img/assets/${menu.src}.png`}
                alt=""
                className="filter invert-100"
              />
              <a
                className={`ml-2 ${!open && 'hidden'} origin-left duration-200`}
                href={menu.link}
                >
                {menu.title}
              </a>
            </li>
          ))}
        </ul>
      </ScrollArea>

      <div className="flex-1">{renderContent()}</div>
    </div>
  );
}

// function for rendering based on the status of the validation token
const RenderBasedStatus = () => {
  // for getting the validation status
  const status = useAppSelector((state) => state.session.status);

  // for getting the userData
  const userData = useAppSelector((state) => state.session);
  const router = useRouter();
  const [UI, setUI] = useState();

  useEffect(() => {
    setUI(renderUI());
  }, [status]);

  // for redering the ui
  const renderUI = () => {
    console.log(status);
    // if verify status succeeded
    if (status == 'succeeded') {
      const userRole = userData.user.user.status;
      // rendering with autentication
      return WithAuth(Admin, [1], userRole);

      // if verify status loading
    } else if (status == 'loading') {
      return <Loading />;

      // if verify status failed
    } else {
      return router.push('/');
    }
  };
  return UI;
};

export default RenderBasedStatus;
