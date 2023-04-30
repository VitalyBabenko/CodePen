import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Bar, Section } from 'react-simple-resizer';
import { useConsole } from '../../hooks';
import style from './Console.module.scss';

export function Console({ isOpen, close }) {
  const appConsole = useConsole();
  const { files } = useSelector(state => state.currentWork);

  useEffect(() => {
    const timeout = setTimeout(() => {
      appConsole.readCode(files.js.text);
    }, 700);

    return () => {
      clearTimeout(timeout);
    };
  }, [files.js.text]);

  useEffect(() => {
    appConsole.readCode(files.js.text);
  }, []);

  if (isOpen) {
    return (
      <>
        <Bar className={style.header}>
          <h2>Console</h2>
          <button onClick={() => window.console.clear()}>Clear</button>
          <button onClick={close}>x</button>
        </Bar>

        <Section
          children={
            <div className={style.console}>
              <div className={style.out}>
                {appConsole.output.map((item, index) => (
                  <pre key={index} className={style.consoleItem}>
                    {item}
                  </pre>
                ))}
              </div>
              <div className={style.entryField}>
                <span>&#62;</span>
                <input
                  type="text"
                  value={appConsole.command}
                  onChange={appConsole.handleCommandChange}
                  onKeyDown={appConsole.handleKeyDown}
                />
              </div>
            </div>
          }
        />
      </>
    );
  } else {
    return null;
  }
}
