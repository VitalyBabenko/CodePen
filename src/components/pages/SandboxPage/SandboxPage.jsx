import Editor from "../../common/Editor/Editor";
import { Preview } from "../../common/Preview/Preview";
import { HeaderPen } from "../../common/HeaderPen/HeaderPen";
import style from "../../pages/PenPage/PenPage.module.scss";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export const SandboxPage = () => {
  const [html, setHtmlValue] = useLocalStorage(`html`, "");
  const [css, setCssValue] = useLocalStorage(`css`, "");
  const [js, setJsValue] = useLocalStorage(`js`, "");

  return (
    <>
      <HeaderPen workTitle={"Untitled"} workOwner={"Captain anonymous"} />

      <div className={style.editors}>
        <Editor
          language="xml"
          displayName={`HTML`}
          value={html}
          onChange={setHtmlValue}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCssValue}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJsValue}
        />
      </div>

      <div className={style.line}></div>

      <Preview html={html} css={css} js={js} />
    </>
  );
};
