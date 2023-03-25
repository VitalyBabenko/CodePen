import React from 'react';
import { Bar, Container } from 'react-simple-resizer';
import Editor from '../Editor/Editor';
import style from './Editors.module.scss';
import { useSelector } from 'react-redux';
import {
  setHtml,
  setCss,
  setJs,
  setLocalHtml,
  setLocalCss,
  setLocalJs,
} from '../../store/currentWork/currentWorkSlice';

export const Editors = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const { files } = useSelector((state) => state.currentWork);
  const { html, css, js } = files;

  const setHtmlText = isAuth ? setHtml : setLocalHtml;
  const setCssText = isAuth ? setCss : setLocalCss;
  const setJsText = isAuth ? setJs : setLocalJs;
  return (
    <Container className={style.editors}>
      <Bar className={style.bar} />

      <Editor
        language="xml"
        displayName={`HTML`}
        value={html.text}
        onChange={setHtmlText}
      />

      <Bar className={style.bar} />

      <Editor
        language="css"
        displayName="CSS"
        value={css.text}
        onChange={setCssText}
      />

      <Bar className={style.bar} />

      <Editor
        language="javascript"
        displayName="JS"
        value={js.text}
        onChange={setJsText}
      />
    </Container>
  );
};
