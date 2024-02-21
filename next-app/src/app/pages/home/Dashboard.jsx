'use client';
import HeroSection from './herosection';
import JadwalMisaSection from './jadwalsection';
import BeritaSection from './beritasection';
import Footer from '@/components/Fragments/Footer';
import Navbar from '@/components/Fragments/Navbar';
import { useEffect } from 'react';
import AuthService from '@/app/api/Auth/route';

function Dashboard() {

  return (
    <>
      <div className="snap-y snap-mandatory h-screen w-full overflow-y-auto">
        <Navbar />
        <HeroSection />
        <JadwalMisaSection />
        <BeritaSection />
        <div className="snap-always snap-center">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
