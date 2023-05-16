import { useState } from 'react';

export const useInput = (initialValue = '', validator) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);

  const onChange = event => {
    // const newValue = event.target.value;
    const newValue = event.target.value;
    console.log(newValue);
    setValue(newValue);

    if (validator) {
      const validationError = validator(newValue);
      setError(validationError);
    }
  };

  return {
    value,
    setValue,
    error,
    onChange,
  };
};
