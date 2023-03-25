import React from 'react';
import { Header } from '../../components/Header/Header';
import style from './SettingsPage.module.scss';
import { ImageUploader } from '../../components/ImageUploader/ImageUploader';

export const SettingsPage = () => {
  return (
    <div className={style.settings}>
      <Header />

      <div className={style.container}>
        <h1>Settings</h1>

        <h2>Profile Image</h2>
        <ImageUploader />

        <h2>About You</h2>
        <div className={style.imageSection}></div>
      </div>
    </div>
  );
};
