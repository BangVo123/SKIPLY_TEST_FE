import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authInfo from "../../constants/authInfo";
import constants from "../../constants/regex";
import { signInWithPopup } from "firebase/auth";
import { auth, githubProvider } from "../../constants/firebaseConfig";

const cx = classNames.bind(styles);

const Form = () => {
  const [isVerify, setIsVerify] = useState(false);
  const inputRef = useRef();

  const navigator = useNavigate();

  const type = isVerify ? "verify" : "authenticate";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const changeToVerify = () => {
    setIsVerify(true);
  };

  const handleFormSubmit = (data) => {
    if (type === "verify") {
      //authenticate here
      fetch("http://localhost:3000/api/v1/auth/verify", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          identifier: inputRef.current,
          code: data.identifier.toString(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem("token", JSON.stringify(data.metadata.token));
        });
      navigator("/dashboard");
    } else {
      changeToVerify();
      reset();
      fetch("http://localhost:3000/api/v1/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ identifier: data.identifier }),
      });
      inputRef.current = data.identifier;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFormSubmit;
    }
  };

  const loginWithGithub = async () => {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;

    const token = await user.getIdToken();
    await fetch("http://localhost:3000/api/v1/auth/github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data.metadata.token));
        navigator("/dashboard");
      });
  };

  return (
    <div className={cx("form-wrapper")}>
      <form
        className={cx("login-form")}
        onSubmit={handleSubmit(handleFormSubmit)}
        onKeyDown={handleKeyDown}
      >
        <div className={cx("form-title")}>
          {type === "verify" ? (
            <h1 className={cx("header")}>{authInfo[type].headerTitleValue}</h1>
          ) : (
            <img
              width="60px"
              height="60px"
              src={authInfo[type].headerTitleValue}
              alt="logo"
            />
          )}
          <p className={cx("title")}>{authInfo[type].headerSubTitle}</p>
        </div>
        <input
          className={cx("input", "identifier", {
            space: !errors.identifier?.message,
          })}
          id="identifier"
          type="text"
          placeholder={authInfo[type].placeholder}
          {...register("identifier", {
            required: "Identifier is required",
            validate: (value) => {
              if (
                type === "authenticate" &&
                !constants.EMAIL_REGEX.test(value)
              ) {
                return "Invalid email";
              }
              return true;
            },
          })}
        />
        {errors.identifier && (
          <p className={cx("error-massage")}>{errors.identifier.message}</p>
        )}
        <button className={cx("login-btn")} type="submit">
          {authInfo[type].btnContent}
        </button>
      </form>
      <div className={cx("github-login")}>
        <p className={cx("github-option")}>Or</p>
        <button className={cx("btn")} onClick={loginWithGithub}>
          Login with Github
        </button>
      </div>
      <div className={cx("privacy_group")}>
        <p className={cx("title", "policy")}>Privacy Policy</p>
        <p className={cx("title")}>
          This site is protected by reCAPTCHA and the Google Privacy
        </p>
        <p className={cx("title", "title_link")}>
          Policy and Terms of Service apply
        </p>
      </div>
    </div>
  );
};

export default Form;
