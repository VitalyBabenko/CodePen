import { useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { useDispatch, useSelector } from 'react-redux';
import style from './Editor.module.scss';
import './themes/twilight.css';
import { ReactComponent as HtmlLogo } from '../../assets/img/htmlLogo.svg';
import { ReactComponent as CssLogo } from '../../assets/img/cssLogo.svg';
import { ReactComponent as JsLogo } from '../../assets/img/jsLogo.svg';
import { Section } from 'react-simple-resizer';
import { saveFiles } from '../../store/currentWork/actions/saveFiles';
import { setFormatCode } from '../../store/currentWork/currentWorkSlice';
import { askToLogin } from '../../utils/askToLogin.js';
import { useNavigate } from 'react-router-dom';
import { GoMessage } from '../GoMessage/GoMessage';
import { useTimedPopup } from '../../hooks/useTimedPopup.js';

const logos = {
  xml: <HtmlLogo />,
  css: <CssLogo />,
  javascript: <JsLogo />,
};

export default function Editor({ language, displayName, value, onChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { id, files } = useSelector((state) => state.currentWork);
  const { isAuth } = useSelector((state) => state.auth);
  const saveMessage = useTimedPopup();

  const handleSave = () => {
    dispatch(setFormatCode());

    if (!isAuth) {
      if (askToLogin()) navigate('/login');
    } else {
      dispatch(
        saveFiles({
          id,
          html: files.html.text,
          css: files.css.text,
          js: files.js.text,
        })
      );
      saveMessage.openPopup();
    }
  };

  const handleFormat = () => {
    dispatch(setFormatCode());
  };

  function handleChange(editor, data, value) {
    dispatch(onChange(value));
  }

  return (
    // Section use for resizers
    <Section className={style.editor}>
      <div className={style.header}>
        <h2>
          {logos[language]}
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
            'Cmd-S': (editor) => handleSave(),
            'Ctrl-S': (editor) => handleSave(),
            'Cmd-F': (editor) => handleFormat(),
            'Ctrl-F': (editor) => handleFormat(),
          },
        }}
        editorDidMount={(editor) => {
          editorRef.current = editor;
        }}
      />
      <GoMessage
        message={'Pen saved.'}
        close={saveMessage.closePopup}
        isOpen={saveMessage.isOpen}
      />
    </Section>
  );
}
