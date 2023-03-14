import React, { useEffect } from "react";
import Editor from "../../common/Editor/Editor";
import { Preview } from "../../common/Preview/Preview";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWork } from "../../../store/currentWork/actions/fetchCurrentWork";
import { useParams } from "react-router-dom";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { saveFiles } from "../../../store/currentWork/actions/saveFiles";
import { HeaderPen } from "../../common/HeaderPen/HeaderPen";
import style from "./PenPage.module.scss";
import {
  setHtml,
  setCss,
  setJs,
} from "../../../store/currentWork/currentWorkSlice";

export const PenPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { title, owner, files, isLoading, error } = useSelector(
    (state) => state.currentWork
  );
  const [html, css, js] = files;

  useEffect(() => {
    dispatch(fetchCurrentWork(id));
  }, []);

  const handleSave = () => {
    const newFiles = {
      id,
      html: html.text,
      css: css.text,
      js: js.text,
    };

    dispatch(saveFiles(newFiles));
  };

  if (isLoading) return <LoadingPage />;
  return (
    <>
      <HeaderPen
        workTitle={title}
        onSave={handleSave}
        workOwner={owner.login}
      />

      <div className={style.editors}>
        <Editor
          language="xml"
          displayName={`HTML`}
          value={html.text}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css.text}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js.text}
          onChange={setJs}
        />
      </div>

      <div className={style.line}></div>

      <Preview html={html.text} css={css.text} js={js.text} />
    </>
  );
};
