import { Header } from "../../common/Header/Header";
import style from "./YourWorksPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../common/Footer/Footer";
import { useEffect } from "react";
import { getUserIdFromJwt } from "../../../utils/getUserIdFromJwt";
import { usePopup } from "../../../hooks/usePopup";
import { CreateWorkPopup } from "./CreateWorkPopup/CreateWorkPopup";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { fetchWorks } from "../../../store/works/actions/fetchWorks";
import { Works } from "../../common/Works/Works";

export const YourWorks = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.works);
  const { isPopupVisible, ref, open, close } = usePopup();

  useEffect(() => {
    if (isAuth) {
      const userId = getUserIdFromJwt(localStorage.authToken);
      dispatch(fetchWorks(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <LoadingPage />;
  return (
    <div className={style.yourWorks}>
      <Header />

      <div className={style.container}>
        <div className={style.worksTab}>
          <a className={style.active} href="/your-works">
            Your Works
          </a>
          <button onClick={open}>+</button>
        </div>

        <Works openPopup={open} />
      </div>

      {isPopupVisible && <CreateWorkPopup popupRef={ref} close={close} />}

      <Footer />
    </div>
  );
};
