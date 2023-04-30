import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Bar, Container, Section } from 'react-simple-resizer';
import { Console } from '../../components/Console/Console';
import { Editors } from '../../components/Editors/Editors';
import { HeaderPen } from '../../components/HeaderPen/HeaderPen';
import { Preview } from '../../components/Preview/Preview';
import { Spinner } from '../../components/Spinner/Spinner';
import { usePopup } from '../../hooks';
import { fetchCurrentWork } from '../../store/currentWork/actions/fetchCurrentWork';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import style from './PenPage.module.scss';

export const PenPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const console = usePopup();

  const { isLoading, error, files } = useSelector(state => state.currentWork);
  const [isSizeChanged, setIsSizeChanged] = useState(false);
  const { html, css, js } = files;

  useEffect(() => {
    dispatch(fetchCurrentWork(id));
  }, []);

  if (error) return <ErrorPage />;
  return (
    <Container
      vertical={true}
      className={style.container}
      onActivate={() => setIsSizeChanged(true)}
      afterResizing={() => setIsSizeChanged(false)}
    >
      <HeaderPen />

      <Section children={<Editors />} />

      <Bar className={style.barVertical} />

      {isLoading && (
        <div className={style.loader}>
          <Spinner />
        </div>
      )}

      <Section
        style={isSizeChanged ? { pointerEvents: 'none' } : null}
        children={<Preview html={html.text} css={css.text} js={js.text} />}
      />

      <Console isOpen={console.isOpen} close={console.close} />

      <footer>
        <button onClick={console.toggle}>console</button>
      </footer>
    </Container>
  );
};
