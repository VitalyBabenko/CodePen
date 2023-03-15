import Editor from "../../common/Editor/Editor";
import { Preview } from "../../common/Preview/Preview";
import { HeaderPen } from "../../common/HeaderPen/HeaderPen";
import style from "../../pages/PenPage/PenPage.module.scss";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { Container, Section, Bar } from "react-simple-resizer";
import { Editors } from "../../common/Editors/Editors";
import { useCallback, useState } from "react";

export const SandboxPage = () => {
  const [html, setHtmlValue] = useLocalStorage(`html`, "");
  const [css, setCssValue] = useLocalStorage(`css`, "");
  const [js, setJsValue] = useLocalStorage(`js`, "");
  const navigate = useNavigate();

  const handleSave = () => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(`You’ll have to Log In or Sign Up  to save your Pen.
    Don’t worry! All your work will be saved to your account.`)
    ) {
      navigate("/login");
    }
  };

  return (
    <Container vertical={true} className={style.container}>
      <HeaderPen
        workTitle={"Untitled"}
        onSave={handleSave}
        workOwner={"Captain anonymous"}
      />
      <Section
        children={
          <Editors
            html={html}
            setHtmlValue={setHtmlValue}
            css={css}
            setCssValue={setCssValue}
            js={js}
            setJsValue={setJsValue}
          />
        }
      />

      <Bar className={style.barVertical} />
      <Section children={<Preview html={html} css={css} js={js} />} />
    </Container>
  );
};
