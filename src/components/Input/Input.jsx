import style from './Input.module.scss';

export const Input = ({ type = 'text', title, value, onChange, error }) => {
  return (
    <label className={error ? style.error : style.root}>
      {title}
      <input type={type} onChange={onChange} value={value} />
      {error && <span>{error}</span>}
    </label>
  );
};
