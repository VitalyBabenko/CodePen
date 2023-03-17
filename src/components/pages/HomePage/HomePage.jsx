import { Link } from "react-router-dom";
import { Header } from "../../common/Header/Header";
import { Footer } from "../../common/Footer/Footer";
import style from "./HomePage.module.scss";

import { ReactComponent as HomeLine } from "../../../assets/img/homeline.svg";
import { ReactComponent as MainSvg } from "../../../assets/img/home.svg";
import { ReactComponent as LogoBig } from "../../../assets/img/logo.svg";
import { ReactComponent as HomeLineTwo } from "../../../assets/img/linehometwo.svg";
import { ReactComponent as Icon1 } from "../../../assets/img/icon1.svg";
import { ReactComponent as Icon2 } from "../../../assets/img/icon2.svg";
import { ReactComponent as Icon3 } from "../../../assets/img/icon3.svg";
import { useSelector } from "react-redux";

export const HomePage = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <div className={style.homePage}>
      <Header />

      <div className={style.container}>
        <div>
          <LogoBig className={style.logoBig} />
          <h1>The best place to build, test, and discover front-end code.</h1>

          <p>
            CodePen is a social development environment for front-end designers
            and developers. Build and deploy a website, show off your work,
            build test cases to learn and debug, and find inspiration.
          </p>

          <Link className={style.link} to={isAuth ? "/your-works" : "/pen"}>
            Start Codding
          </Link>
        </div>
        <div>
          <MainSvg />
        </div>
      </div>
      <div className={style.homeline}>
        <HomeLine />
      </div>
      <div className={style.homelinetwo}>
        <HomeLineTwo />
      </div>

      <div className={style.table}>
        <div className={style.card}>
          <div className={style.iconcard}>
            <Icon1 />
          </div>
          <h2>Build & Test</h2>
          <p>
            Get work done quicker by building out entire projects or isolating
            code to test features and animations. Want to keep it all under
            wraps?
          </p>
          <button>Try the Editor</button>
        </div>

        <div className={style.card}>
          <div className={style.iconcard}>
            <Icon2 />
          </div>
          <h2>Learn & Discover</h2>
          <p>
            Want to upgrade your skills and get noticed? Participating in
            CodePen Challenges is a great way to try something new. We
            frequently feature these Pens on our homepage and across social
            media!
          </p>
          <button>Join this Week's Challenge</button>
        </div>

        <div className={style.card}>
          <div className={style.iconcard}>
            <Icon3 />
          </div>
          <h2>Share Your Work</h2>
          <p>
            Become a part of the most active front-end community in the world by
            sharing work. Presenting at a conference? Show your code directly in
            the browser with Presentation Mode.
          </p>
          <button>Explore Trending</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
