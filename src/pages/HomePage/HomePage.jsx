import { Link } from 'react-router-dom';
import style from './HomePage.module.scss';

import { ReactComponent as Decor1 } from '../../assets/img/homeline.svg';
import { ReactComponent as Decor2 } from '../../assets/img/linehometwo.svg';
import { ReactComponent as MainSvg } from '../../assets/img/home.svg';
import { ReactComponent as LogoBig } from '../../assets/img/logo.svg';
import { ReactComponent as Icon1 } from '../../assets/img/icon1.svg';
import { ReactComponent as Icon2 } from '../../assets/img/icon2.svg';
import { ReactComponent as Icon3 } from '../../assets/img/icon3.svg';
import { useSelector } from 'react-redux';
import { MainLayout } from '../../layouts/MainLayout';
import { HomeCard } from '../../components/HomeCard/HomeCard';

export const HomePage = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <MainLayout className={style.homePage}>
      <section>
        <LogoBig />
        <h1>The best place to build, test, and discover front-end code.</h1>
        <p>
          CodePen is a social development environment for front-end designers
          and developers. Build and deploy a website, show off your work, build
          test cases to learn and debug, and find inspiration.
        </p>
        <Link to={isAuth ? '/your-works' : '/pen'}>
          {isAuth ? 'Your works' : 'Start Codding'}
        </Link>
        <MainSvg className={style.mainSvg} />
        <Decor1 className={style.decor1} />
      </section>

      <section>
        <HomeCard
          icon={Icon1}
          title={'Build & Test'}
          description={`Get work done quicker by building out entire projects or isolating
            code to test features and animations. Want to keep it all under
            wraps?`}
        />
        <HomeCard
          icon={Icon2}
          title={'Learn & Discover'}
          description={`Want to upgrade your skills and get noticed? Participating in
            CodePen Challenges is a great way to try something new. We
            frequently feature these Pens on our homepage and across social
            media!`}
        />
        <HomeCard
          icon={Icon3}
          title={'Share Your Work'}
          description={`Become a part of the most active front-end community in the world by
            sharing work. Presenting at a conference? Show your code directly in
            the browser with Presentation Mode.`}
        />
        <Decor2 className={style.decor2} />
      </section>
    </MainLayout>
  );
};
