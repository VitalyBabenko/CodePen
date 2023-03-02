import { Header } from '../../components/Header/Header';
import style from './PenPage.module.scss';
import { useState } from 'react';

export const PenPage = () => {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [consoleLog, setConsoleLog] = useState('');

  const handleHtmlChange = (event) => {
    setHtmlCode(event.target.value);
  };

  const handleCssChange = (event) => {
    setCssCode(event.target.value);
  };

  const handleJsChange = (event) => {
    setJsCode(event.target.value);
  };

  const handleRunCode = () => {
    // Создаем временный iframe для запуска кода
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Записываем код HTML, CSS и JS в соответствующие теги iframe
    const iframeHtml = `<!DOCTYPE html><html><head><style>${cssCode}</style></head><body>${htmlCode}<script>${jsCode}</script></body></html>`;
    iframe.contentDocument.open();
    iframe.contentDocument.write(iframeHtml);
    iframe.contentDocument.close();

    // Получаем вывод console.log из iframe
    const consoleLog = iframe.contentWindow.consoleLog;
    setConsoleLog(consoleLog);

    // Удаляем временный iframe
    iframe.remove();
  };

  return (
    <div className={style.penPage}>
      <Header />
      <div className={style.code}>
        <textarea
          className={style.code__html}
          placeholder="HTML"
          value={htmlCode}
          onChange={handleHtmlChange}></textarea>
        <textarea
          className={style.code__css}
          placeholder="CSS"
          value={cssCode}
          onChange={handleCssChange}></textarea>
        <textarea
          className={style.code__js}
          placeholder="JS"
          value={jsCode}
          onChange={handleJsChange}></textarea>
      </div>
      <button className={style.code_run} onClick={handleRunCode}>
        Run
      </button>
      <div className={style.console}>
        <h2 className={style.console__title}>Console.log output:</h2>
        <div className={style.console__log}>{consoleLog}</div>
      </div>
    </div>
  );
};
