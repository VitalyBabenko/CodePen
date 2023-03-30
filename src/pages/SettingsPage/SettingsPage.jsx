import React from 'react';
import { Header } from '../../components/Header/Header';
import style from './SettingsPage.module.scss';
import { ImageUploader } from '../../components/ImageUploader/ImageUploader';
import { UpdatePassword } from '../../components/UpdatePassword/UpdatePassword';

export const SettingsPage = () => {
  return (
    <div className={style.settings}>
      <Header />

      <div className={style.container}>
        <h1>Settings</h1>

        <h2>Profile Image</h2>
        <ImageUploader />

        <div className={style.updatePassword}>
          <h2>Update Password</h2>

          <UpdatePassword />
        </div>
      </div>
    </div>
  );
};
