import style from "./LoginPage.module.scss";
import { ReactComponent as LogoBig } from "../../../assets/img/logoBig.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/auth/actions/loginAction";
import { Input } from "../../common/Input/Input";
import useInput from "../../../hooks/useInput";
import { LoadingPage } from "../LoadingPage/LoadingPage";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged, loading, error } = useSelector((state) => state.auth);
  const loginName = useInput("");
  const password = useInput("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userData = {
      login: loginName.value,
      password: password.value,
    };

    dispatch(login(userData));
  };

  useEffect(() => {
    if (isLogged) navigate("/your-works");
    if (error) {
      loginName.setValue("");
      password.setValue("");
    }
  }, [isLogged, error]);

  if (loading) return <LoadingPage />;
  return (
    <form onSubmit={handleFormSubmit} className={style.container}>
      <NavLink to="/">
        <LogoBig className={style.logoBig} />
      </NavLink>

      <h1>Log In!</h1>

      {error && <span>{error}</span>}

      <Input
        title={"Login"}
        value={loginName.value}
        onChange={loginName.onChange}
      />

      <Input
        type={"password"}
        title={"Password"}
        value={password.value}
        onChange={password.onChange}
      />

      <button type="submit" className={style.login}>
        Log In
      </button>

      <p>
        Need an account? <NavLink to="/signup">Sign up now!</NavLink>
      </p>
    </form>
  );
};
