import style from './Input.module.scss';

export const Input = ({ type = 'text', title, value, onChange, error, inputRef }) => {
  return (
    <label className={error ? style.error : style.root}>
      {title}
      <input ref={inputRef} type={type} onChange={onChange} value={value} />
      {error && <span>{error}</span>}
    </label>
  );
};
