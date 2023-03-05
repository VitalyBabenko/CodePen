import style from "./SignUpPage.module.scss";
import { ReactComponent as LogoBig } from "../../../assets/img/logoBig.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../../store/auth/actions/registrationAction";

export const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLogged } = useSelector((state) => state.auth);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password === confirmPassword && userName) {
      dispatch(registration({ userName, password }));
    }
  };

  useEffect(() => {
    if (isLogged) navigate("/your-works");
  }, [isLogged]);

  return (
    <form onSubmit={handleSignUp} className={style.container}>
      <NavLink to="/">
        <LogoBig className={style.logoBig} />
      </NavLink>

      <h1>Sign up!</h1>
      <div>
        <p>Username or Email</p>
        <input value={userName} onChange={(e) => setUserName(e.target.value)} />
      </div>

      <div>
        <p>Password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
        />
      </div>

      <div>
        <p>Confirm Password</p>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type={"password"}
        />
      </div>
      <button type="submit" className={style.login}>
        Sign Up
      </button>
    </form>
  );
};
