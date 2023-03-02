import style from "./SignUpPage.module.scss";
import { ReactComponent as LogoBig } from "../../assets/img/logoBig.svg";
import { NavLink } from "react-router-dom";
import { User } from "../../service";
import { useState } from "react";

export const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password === confirmPassword && userName) {
      User.createUser(userName, password);
    }
  };

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
