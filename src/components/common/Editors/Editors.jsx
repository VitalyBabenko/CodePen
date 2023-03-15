import React from "react";
import { Bar, Container, Section } from "react-simple-resizer";
import Editor from "../Editor/Editor";
import style from "./Editors.module.scss";

export const Editors = (props) => {
  const { html, setHtmlValue, css, setCssValue, js, setJsValue } = props;

  return (
    <Container width={"100vw"} height={"100%"} className={style.editors}>
      <Bar className={style.bar} />
      <Section
        children={
          <Editor
            language="xml"
            displayName={`HTML`}
            value={html}
            onChange={setHtmlValue}
          />
        }
      />

      <Bar className={style.bar} />
      <Section
        children={
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCssValue}
          />
        }
      />
      <Bar className={style.bar} />
      <Section
        children={
          <Editor
            language="javascript"
            displayName="JS"
            value={js}
            onChange={setJsValue}
          />
        }
      />
    </Container>
  );
};
