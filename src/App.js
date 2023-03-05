import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/pages/LoginPage/LoginPage";
import { ErrorPage } from "./components/pages/ErrorPage/ErrorPage";
import { HomePage } from "./components/pages/HomePage/HomePage";
import { PenPage } from "./components/pages/PenPage/PenPage";
import { SignUpPage } from "./components/pages/SignUpPage/SignUpPage";
import { YourWorks } from "./components/pages/YourWorksPage/YourWorksPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserIdFromJwt } from "./utils/getUserIdFromJwt";
import { getWorks } from "./store/user/actions/getWorks";

function App() {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLogged) {
      setTimeout(() => {
        const userId = getUserIdFromJwt(localStorage.authToken);
        dispatch(getWorks(userId));
      }, 2000);
    }
  }, [isLogged, dispatch]);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pen" element={<PenPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/your-works" element={<YourWorks />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
