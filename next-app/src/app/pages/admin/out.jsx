'use client';
import React, { useState } from 'react';
import PageHome from '@/app/pages/home/page';
import AuthService from '@/app/api/Auth/route';

const Logout = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      setShowModal(false);
      await AuthService().Logout();
    } catch (e) {
      console.log('error');
    }

    // Lakukan logout tanpa konfirmasi
  };

  const handleShowModal = () => {
    // Menampilkan modal hanya jika belum ditutup
    if (!showModal) {
      setShowModal(true);
    }
  };

  return (
    <div className="text-center w-full h-full flex items-center justify-center">
      <button
        onClick={handleShowModal}
        className="bg-secondary border-4 border-secondary rounded-md py-2 px-4 text-white hover:bg-red-500"
      >
        Logout
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white rounded-md p-4 z-10">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 mr-2 rounded-md"
              >
                Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
