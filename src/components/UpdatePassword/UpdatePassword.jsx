import { Input } from '../Input/Input';
import style from './UpdatePassword.module.scss';
import { useInput } from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../store/user/actions/changePassword';

export const UpdatePassword = () => {
  const dispatch = useDispatch();
  const currentPassword = useInput('');
  const newPassword = useInput('');
  const { login } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPasswordData = {
      login,
      password: currentPassword.value,
      newPassword: newPassword.value,
    };

    dispatch(changePassword(newPasswordData));
    currentPassword.setValue('');
    newPassword.setValue('');
  };

  return (
    <form className={style.updatePassword} onSubmit={handleSubmit}>
      <Input
        value={currentPassword.value}
        onChange={currentPassword.onChange}
        title="Current Password"
        type="password"
      />
      <Input
        value={newPassword.value}
        onChange={newPassword.onChange}
        title="New Password"
        type="password"
      />
      <button
        disabled={!currentPassword.value || !newPassword.value}
        type="submit"
      >
        Update
      </button>
    </form>
  );
};
