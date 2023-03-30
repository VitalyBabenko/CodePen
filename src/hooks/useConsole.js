import { useEffect, useState } from 'react';

export const useConsole = () => {
  const [output, setOutput] = useState([]);
  const [command, setCommand] = useState('');

  useEffect(() => {
    window.console = {
      log: (...args) => setOutput((output) => [...output, args.join(' ')]),
      error: (...args) => setOutput((output) => [...output, args.join(' ')]),
      clear: () => setOutput([]),
    };
  }, []);

  const handleCommandChange = (event) => {
    setCommand(event.target.value);
  };

  const readCode = (code) => {
    setOutput([]);
    const strings = code.split('\n').filter((item) => item.length);

    strings.forEach((string) => {
      try {
        const result = eval(string);
        if (result) {
          setOutput((output) => [...output, result]);
        }
      } catch (e) {
        setOutput((output) => [...output, e.toString()]);
      }
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      try {
        const result = eval(event.target.value);
        setOutput((output) => [...output, result]);
      } catch (e) {
        setOutput((output) => [...output, e.toString()]);
      }
      setCommand('');
      event.preventDefault();
    }
  };

  return {
    output,
    command,
    setCommand,
    readCode,
    handleKeyDown,
    handleCommandChange,
  };
};
