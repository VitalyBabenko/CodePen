import React, { useEffect, useState } from "react";
import { Preview } from "../../common/Preview/Preview";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWork } from "../../../store/currentWork/actions/fetchCurrentWork";
import { useParams } from "react-router-dom";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { HeaderPen } from "../../common/HeaderPen/HeaderPen";
import style from "./PenPage.module.scss";
import { Bar, Container, Section } from "react-simple-resizer";
import { Editors } from "../../common/Editors/Editors";
import { ErrorPage } from "../ErrorPage/ErrorPage";

export const PenPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, error, files } = useSelector((state) => state.currentWork);
  const [isSizeChanged, setIsSizeChanged] = useState(false);
  const { html, css, js } = files;

  useEffect(() => {
    dispatch(fetchCurrentWork(id));
  }, []);

  if (isLoading) return <LoadingPage />;
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

      <Section
        style={isSizeChanged ? { pointerEvents: "none" } : null}
        children={<Preview html={html.text} css={css.text} js={js.text} />}
      />
    </Container>
  );
};
