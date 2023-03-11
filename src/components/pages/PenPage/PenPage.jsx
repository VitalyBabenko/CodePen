import React, { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header";
import Editor from "../../common/Editor/Editor";
import "../../common/Editor/pen.css";
import { Preview } from "../../common/Preview/Preview";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWork } from "../../../store/currentWork/actions/fetchCurrentWork";
import { useParams } from "react-router-dom";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { saveFiles } from "../../../store/currentWork/actions/saveFiles";

export const PenPage = () => {
  const { currentWork, isLoading, error } = useSelector(
    (state) => state.currentWork
  );
  const dispatch = useDispatch();
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCurrentWork(id));
  }, []);

  useEffect(() => {
    const [HTML, CSS, JS] = currentWork.files;
    setHtml(HTML.text);
    setCss(CSS.text);
    setJs(JS.text);
  }, [currentWork.files]);

  const handleUpdate = () => {
    dispatch(saveFiles({ id, html, css, js }));
  };

  if (isLoading) return <LoadingPage />;
  return (
    <>
      <Header />
      <button onClick={handleUpdate}>save</button>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>

      <Preview html={html} css={css} js={js} />
    </>
  );
};
