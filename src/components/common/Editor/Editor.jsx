import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import style from "./Editor.module.scss";
import "./themes/twilight.css";
import { ReactComponent as HtmlLogo } from "../../../assets/img/htmlLogo.svg";
import { ReactComponent as CssLogo } from "../../../assets/img/cssLogo.svg";
import { ReactComponent as JsLogo } from "../../../assets/img/jsLogo.svg";
export default function Editor(props) {
  const { language, displayName, value, onChange } = props;
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const logos = {
    xml: <HtmlLogo />,
    css: <CssLogo />,
    javascript: <JsLogo />,
  };

  function handleChange(editor, data, value) {
    dispatch(onChange(value));
  }

  return (
    <div className={open ? style.editorOpen : style.collapsed}>
      <div className={style.header}>
        <h2>
          {logos[language]}
          {displayName}
        </h2>

        <button
          className={style.collapseBtn}
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>

      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className={style.codeMirrorWrapper}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "twilight",
          lineNumbers: true,
          autoCorrect: true,
        }}
      />
    </div>
  );
}
