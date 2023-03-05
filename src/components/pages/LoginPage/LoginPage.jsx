import style from "./LoginPage.module.scss";
import { ReactComponent as LogoBig } from "../../../assets/img/logoBig.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/auth/actions/loginAction";

export const LoginPage = () => {
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const { loading, isLogged, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  useEffect(() => {
    if (isLogged) navigate("/your-works");
  }, [isLogged]);

  return (
    <form onSubmit={handleFormSubmit} className={style.container}>
      <NavLink to="/">
        <LogoBig className={style.logoBig} />
      </NavLink>

      <h1>Log In!</h1>

      <label>
        Login:
        <input
          type="text"
          name="login"
          value={loginData.login}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
        />
      </label>

      {loading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error}</p> : null}

      <button type="submit" className={style.login}>
        Log In
      </button>

      <p>
        Need an account? <NavLink to="/signup">Sign up now!</NavLink>
      </p>
    </form>
  );
};
