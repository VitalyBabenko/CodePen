import { Header } from "../../common/Header/Header";
import style from "./YourWorksPage.module.scss";
import { ReactComponent as LogoBig } from "../../../assets/img/logoBig.svg";
import { useSelector } from "react-redux";
import { WorkCard } from "../../common/WorkCard/WorkCard";
import { Loader } from "../../common/Loader/Loader";

export const YourWorks = () => {
  const { works, isLoading } = useSelector((state) => state.user);

  const addWork = () => {};

  if (isLoading) return <Loader />;
  return (
    <div className={style.yourWorks}>
      <Header />

      <div className={style.container}>
        <div className={style.worksTab}>
          <a className={style.active} href="/your-works">
            Your Works
          </a>
          <button onClick={addWork}>+</button>
        </div>

        <div className={style.works}>
          {works && works.map((work) => <WorkCard key={work._id} />)}
        </div>
      </div>

      <footer className={style.footer}>
        <div className={style.main}>
          <LogoBig className={style.logoBig} />
          <p>©2023 CodePen</p>
        </div>
      </footer>
    </div>
  );
};
