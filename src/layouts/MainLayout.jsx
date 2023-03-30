import React from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

export const MainLayout = ({ children, className }) => {
  return (
    <div className={className}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
