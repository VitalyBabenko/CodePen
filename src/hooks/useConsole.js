import { useEffect, useState } from 'react';

// export const useConsole = () => {
//   const [history, setHistory] = useState([]);

//   function addResult(inputAsString, output) {
//     const outputAsString = Array.isArray(output)
//       ? `[${output.join(', ')}]`
//       : output.toString();
//     setHistory((prevHistory) => [
//       ...prevHistory,
//       { input: inputAsString, output: outputAsString },
//     ]);
//   }

//   const readCode = (code) => {
//     if (code.length === 0) return;

//     const strings = code.split('\n').filter((item) => item.length);

//     strings.forEach((string) => {
//       try {
//         addResult(string, eval(string));
//       } catch (err) {
//         addResult(string, err);
//       }
//     });
//   };

//   return {
//     history,
//     readCode,
//     addResult,
//     handleInputKeyUp,
//   };
// };

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

        setOutput((output) => [...output, result]);
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
