import { useEffect, useState } from 'react';
import style from './Preview.module.scss';

export const Preview = ({ html, css, js }) => {
  const [srcDoc, setSrcDoc] = useState();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
            <html >
              <body>${html}</body>
              <style>${css}</style>
              <script>${js}</script>
            </html>
          `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <iframe
      className={style.preview}
      srcDoc={srcDoc}
      title="output"
      sandbox="allow-forms allow-modals  allow-popups  allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation"
    />
  );
};
