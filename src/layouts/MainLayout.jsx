import React from 'react';
import { GoMessage } from '../components/GoMessage/GoMessage';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

export const MainLayout = ({ children, className }) => {
  return (
    <div className={className}>
      <GoMessage />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
