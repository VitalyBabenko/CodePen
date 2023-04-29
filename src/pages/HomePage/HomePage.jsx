import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { appIcons, appImages } from '../../assets/img';
import { HomeCard } from '../../components/HomeCard/HomeCard';
import { MainLayout } from '../../layouts/MainLayout';
import style from './HomePage.module.scss';

export const HomePage = () => {
  const { isAuth } = useSelector(state => state.auth);
  const { AppIcon } = appIcons;
  const { HomeDecor1, HomeDecor2, HomeCard1, HomeCard2, HomeCard3, HomeMain } = appImages;

  return (
    <MainLayout className={style.homePage}>
      <section>
        <AppIcon />
        <h1>The best place to build, test, and discover front-end code.</h1>
        <p>
          CodePen is a <strong>social development environment</strong> for front-end
          designers and developers. Build and deploy a website, show off your work, build
          test cases to learn and debug, and find inspiration.
        </p>
        <Link to={isAuth ? '/your-works' : '/pen'}>
          {isAuth ? 'Your works' : 'Start Codding'}
        </Link>
        <HomeMain className={style.mainSvg} />
        <HomeDecor1 className={style.decor1} />
      </section>

      <section>
        <HomeCard
          icon={HomeCard1}
          title={'Build & Test'}
          description={`Get work done quicker by building out entire projects or isolating
            code to test features and animations. Want to keep it all under
            wraps?`}
        />
        <HomeCard
          icon={HomeCard2}
          title={'Learn & Discover'}
          description={`Want to upgrade your skills and get noticed? Participating in
            CodePen Challenges is a great way to try something new. We
            frequently feature these Pens on our homepage and across social
            media!`}
        />
        <HomeCard
          icon={HomeCard3}
          title={'Share Your Work'}
          description={`Become a part of the most active front-end community in the world by
            sharing work. Presenting at a conference? Show your code directly in
            the browser with Presentation Mode.`}
        />
        <HomeDecor2 className={style.decor2} />
      </section>
    </MainLayout>
  );
};
