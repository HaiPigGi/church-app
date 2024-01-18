'use client';
import { useState } from 'react';
import { FaAnglesLeft } from 'react-icons/fa6';
import Out from '@/app/pages/admin/out';
import Pesan from '@/app/pages/admin/pesan';
import Organisasi from './organisasi';
import Posisi from './posisi';
import Member from './member';

export default function admin() {
  const [open, setopen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('');

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
      title: 'Hidden',
      src: 'view (1)',
      onClick: () => handleMenuClick('Hidden'),
    },
    {
      title: 'Pengumunan',
      src: 'alert (1)',
      gab: true,
      onClick: () => handleMenuClick('Pengumunan'),
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

  const Jadwal = () => (
    <h1 className="p-7 text-2xl font-semibold flex-1 h-screen text-center">
      Jadwal page
    </h1>
  );

  const Search = () => (
    <h1 className="p-7 text-2xl font-semibold flex-1 h-screen text-center">
      Search page
    </h1>
  );

  const Pengumunan = () => (
    <h1 className="p-7 text-2xl font-semibold flex-1 h-screen text-center">
      Pengumunan page
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
      case 'Hidden':
        return <Search />;
      case 'Pengumunan':
        return <Pengumunan />;
      case 'Logout':
        return <Out />;
      default:
        return null; // or a default component if no match
    }
  };

  return (
    <div className="flex">
      <div
        className={` ${open ? 'w-72' : 'w-20'} p-3 pt-5 h-screen duration-300 bg-secondary relative`}
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
      </div>

      <div className="flex-1">{renderContent()}</div>
    </div>
  );
}
