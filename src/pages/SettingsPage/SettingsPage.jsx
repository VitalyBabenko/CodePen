import style from './SettingsPage.module.scss';
import { ImageUploader } from '../../components/ImageUploader/ImageUploader';
import { UpdatePassword } from '../../components/UpdatePassword/UpdatePassword';
import { MainLayout } from '../../layouts/MainLayout';
import { useSelector } from 'react-redux';
import { Spinner } from '../../components/Spinner/Spinner';

export const SettingsPage = () => {
  const { isLoading } = useSelector((state) => state.user);

  return (
    <MainLayout className={style.settings}>
      <div className={style.container}>
        <h1>Settings</h1>

        {isLoading ? (
          <div className={style.loader}>
            <Spinner />
          </div>
        ) : (
          <>
            <section>
              <h2>Profile Image</h2>
              <ImageUploader />
            </section>

            <section>
              <h2>Update Password</h2>
              <UpdatePassword />
            </section>
          </>
        )}
      </div>
    </MainLayout>
  );
};
