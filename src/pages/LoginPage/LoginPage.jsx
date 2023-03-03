import style from "./LoginPage.module.scss";
import { ReactComponent as LogoBig } from "../../assets/img/logoBig.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "../../service";
import { Validator } from "../../utils/validator";

export const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handelLogin = async (e) => {
    e.preventDefault();
    if (
      Validator.validateLogin(userName) &&
      Validator.validatePassword(password)
    ) {
      const login = await User.login(userName, password);
      if (login) {
        navigate("/your-works");
      }
    }
  };

  return (
    <form onSubmit={handelLogin} className={style.container}>
      <NavLink to="/">
        <LogoBig className={style.logoBig} />
      </NavLink>

      <h1>Log In!</h1>
      <div>
        <p>Username or Email</p>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type={"email"}
        />
      </div>
      <div>
        <p>Password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
        />
      </div>
      <button onClick={handelLogin} className={style.login}>
        Log In
      </button>
      <p>
        Need an account? <NavLink to="/signup">Sign up now!</NavLink>
      </p>
    </form>
  );
};
