import style from "./SignUpPage.module.scss";
import { ReactComponent as LogoBig } from "../../../assets/img/logoBig.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../../store/auth/actions/registrationAction";
import { useInput } from "../../../hooks/useInput";
import { Input } from "../../common/Input/Input";
import { Validate } from "../../../utils/Validate";
import { LoadingPage } from "../LoadingPage/LoadingPage";

export const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, error, loading } = useSelector((state) => state.auth);
  const userName = useInput("", Validate.userName);
  const password = useInput("", Validate.password);
  const confirmPassword = useInput("", (value) =>
    Validate.confirmPassword(value, password.value)
  );
  const isError =
    userName.error ||
    password.error ||
    confirmPassword.error ||
    !userName.value ||
    !password.value ||
    !confirmPassword.value;

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!isError) {
      const userData = {
        login: userName.value,
        password: password.value,
      };

      dispatch(registration(userData));
    }
  };

  useEffect(() => {
    if (isAuth) navigate("/your-works");
  }, [isAuth]);

  if (loading) return <LoadingPage />;
  return (
    <form onSubmit={handleSignUp} className={style.container}>
      <NavLink to="/">
        <LogoBig className={style.logoBig} />
      </NavLink>

      <h1>Sign up!</h1>

      {error && <span>{error}</span>}

      <Input
        title="Username"
        value={userName.value}
        onChange={userName.onChange}
        error={userName.error}
      />

      <Input
        title="Password"
        type={"password"}
        value={password.value}
        onChange={password.onChange}
        error={password.error}
      />

      <Input
        title="Confirm Password"
        type={"password"}
        value={confirmPassword.value}
        onChange={confirmPassword.onChange}
        error={confirmPassword.error}
      />

      <button type="submit" disabled={isError} className={style.login}>
        Sign Up
      </button>
    </form>
  );
};
