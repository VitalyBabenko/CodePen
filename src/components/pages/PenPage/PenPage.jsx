import React, { useState } from "react";
import { Header } from "../../common/Header/Header";
import Editor from "../../common/Editor/Editor";
import "../../common/Editor/pen.css";
import { useParams } from "react-router-dom";

import { Preview } from "../../common/Preview/Preview";

export const PenPage = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const { id } = useParams();

  return (
    <>
      <Header />
      {/* <button onClick={handleUpdate}>save</button> */}
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
