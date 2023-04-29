import { useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { useDispatch, useSelector } from 'react-redux';
import './themes/twilight.css';
import { Section } from 'react-simple-resizer';
import { appIcons } from '../../assets/img';
import { openLoginPopup } from '../../store/auth/authSlice';
import { saveFiles } from '../../store/currentWork/actions/saveFiles';
import { setFormatCode } from '../../store/currentWork/currentWorkSlice';
import { showSuccessMessage } from '../../store/goMessage/goMessageSlice';
import style from './Editor.module.scss';

export default function Editor({ language, displayName, value, onChange }) {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { id, files } = useSelector(state => state.currentWork);
  const { isAuth } = useSelector(state => state.auth);
  const { HtmlIcon, CssIcon, JsIcon } = appIcons;

  const languageIcons = {
    xml: <HtmlIcon />,
    css: <CssIcon />,
    javascript: <JsIcon />,
  };

  const handleSave = () => {
    dispatch(setFormatCode());

    if (!isAuth) {
      dispatch(openLoginPopup());
    } else {
      dispatch(
        saveFiles({
          id,
          html: files.html.text,
          css: files.css.text,
          js: files.js.text,
        })
      );
    }
  };

  const handleFormat = () => {
    dispatch(setFormatCode());
    dispatch(showSuccessMessage('Code formatted.'));
  };

  function handleChange(editor, data, value) {
    dispatch(onChange(value));
  }

  return (
    // Section use for resizers
    <Section className={style.editor}>
      <div className={style.header}>
        <h2>
          {languageIcons[language]}
          {displayName}
        </h2>
      </div>

      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className={style.codeMirrorWrapper}
        options={{
          lint: true,
          mode: language,
          theme: 'twilight',
          lineNumbers: true,
          keyMap: 'default',
          extraKeys: {
            'Cmd-S': editor => handleSave(),
            'Ctrl-S': editor => handleSave(),
            'Cmd-F': editor => handleFormat(),
            'Ctrl-F': editor => handleFormat(),
          },
        }}
        editorDidMount={editor => {
          editorRef.current = editor;
        }}
      />
    </Section>
  );
}
