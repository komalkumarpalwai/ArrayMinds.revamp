import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8F9FD] text-[#1E113F]">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
